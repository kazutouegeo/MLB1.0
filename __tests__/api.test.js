const request = require('supertest');
const app = require('../server/index');

describe('MLB API', () => {
  test('GET /health - should return health status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body.status).toBe('healthy');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('uptime');
  });

  test('GET /api/mlb/teams - should return teams list', async () => {
    const response = await request(app)
      .get('/api/mlb/teams')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/mlb/standings - should return standings', async () => {
    const response = await request(app)
      .get('/api/mlb/standings')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  test('GET /api/mlb/players - should return players list', async () => {
    const response = await request(app)
      .get('/api/mlb/players')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  test('POST /api/mlb/search - should perform search', async () => {
    const response = await request(app)
      .post('/api/mlb/search')
      .send({ query: 'Yankees' })
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.query).toBe('Yankees');
  });

  test('GET /api/mlb/teams/yankees - should return specific team', async () => {
    const response = await request(app)
      .get('/api/mlb/teams/yankees')
      .expect(200);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('name');
    expect(response.body.data.name).toBe('New York Yankees');
  });

  test('GET /api/mlb/teams/nonexistent - should return 404', async () => {
    const response = await request(app)
      .get('/api/mlb/teams/nonexistent')
      .expect(404);
    
    expect(response.body.success).toBe(false);
  });
});