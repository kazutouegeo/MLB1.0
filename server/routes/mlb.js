const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const MLBModel = require('../models/MLB');
const logger = require('../utils/logger');

// Validation middleware
const validateTeamQuery = [
  body('team').optional().isString().trim().isLength({ min: 2, max: 50 })
    .withMessage('Team name must be between 2 and 50 characters'),
  body('year').optional().isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Year must be between 1900 and current year')
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// GET /api/mlb/teams - Get all MLB teams
router.get('/teams', async (req, res) => {
  try {
    const teams = await MLBModel.getAllTeams();
    logger.info(`Retrieved ${teams.length} teams`);
    
    res.json({
      success: true,
      count: teams.length,
      data: teams
    });
  } catch (error) {
    logger.error(`Error fetching teams: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching teams',
      error: error.message
    });
  }
});

// GET /api/mlb/teams/:id - Get specific team
router.get('/teams/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const team = await MLBModel.getTeamById(id);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }

    logger.info(`Retrieved team: ${team.name}`);
    res.json({
      success: true,
      data: team
    });
  } catch (error) {
    logger.error(`Error fetching team ${req.params.id}: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error.message
    });
  }
});

// GET /api/mlb/standings - Get current standings
router.get('/standings', async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    const standings = await MLBModel.getStandings(year);
    
    logger.info(`Retrieved standings for year ${year}`);
    res.json({
      success: true,
      year: parseInt(year),
      data: standings
    });
  } catch (error) {
    logger.error(`Error fetching standings: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching standings',
      error: error.message
    });
  }
});

// GET /api/mlb/players - Get players (with optional team filter)
router.get('/players', async (req, res) => {
  try {
    const { team, position, limit = 50 } = req.query;
    const players = await MLBModel.getPlayers({ team, position, limit: parseInt(limit) });
    
    logger.info(`Retrieved ${players.length} players`);
    res.json({
      success: true,
      count: players.length,
      data: players
    });
  } catch (error) {
    logger.error(`Error fetching players: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching players',
      error: error.message
    });
  }
});

// GET /api/mlb/stats - Get statistics
router.get('/stats', async (req, res) => {
  try {
    const { type = 'batting', team, year } = req.query;
    const stats = await MLBModel.getStats({ type, team, year });
    
    logger.info(`Retrieved ${type} stats`);
    res.json({
      success: true,
      type,
      data: stats
    });
  } catch (error) {
    logger.error(`Error fetching stats: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

// POST /api/mlb/search - Search MLB data
router.post('/search', 
  [
    body('query').isString().trim().isLength({ min: 1, max: 100 })
      .withMessage('Search query must be between 1 and 100 characters'),
    body('type').optional().isIn(['teams', 'players', 'stats'])
      .withMessage('Search type must be teams, players, or stats')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { query, type = 'all' } = req.body;
      const results = await MLBModel.search(query, type);
      
      logger.info(`Search performed for: "${query}" (type: ${type})`);
      res.json({
        success: true,
        query,
        type,
        count: results.length,
        data: results
      });
    } catch (error) {
      logger.error(`Error in search: ${error.message}`);
      res.status(500).json({
        success: false,
        message: 'Error performing search',
        error: error.message
      });
    }
  }
);

module.exports = router;