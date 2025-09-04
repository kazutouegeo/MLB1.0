const fs = require('fs');
const path = require('path');

class MLBModel {
  constructor() {
    this.dataPath = path.join(__dirname, '../data');
    this.initializeData();
  }

  initializeData() {
    // Ensure data directory exists
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
    }

    // Sample MLB data
    this.teams = [
      {
        id: 'yankees',
        name: 'New York Yankees',
        city: 'New York',
        abbreviation: 'NYY',
        league: 'American',
        division: 'East',
        founded: 1901,
        stadium: 'Yankee Stadium',
        worldSeriesWins: 27,
        colors: ['Navy Blue', 'White']
      },
      {
        id: 'dodgers',
        name: 'Los Angeles Dodgers',
        city: 'Los Angeles',
        abbreviation: 'LAD',
        league: 'National',
        division: 'West',
        founded: 1883,
        stadium: 'Dodger Stadium',
        worldSeriesWins: 7,
        colors: ['Dodger Blue', 'White']
      },
      {
        id: 'red-sox',
        name: 'Boston Red Sox',
        city: 'Boston',
        abbreviation: 'BOS',
        league: 'American',
        division: 'East',
        founded: 1901,
        stadium: 'Fenway Park',
        worldSeriesWins: 9,
        colors: ['Red', 'Navy Blue', 'White']
      },
      {
        id: 'giants',
        name: 'San Francisco Giants',
        city: 'San Francisco',
        abbreviation: 'SF',
        league: 'National',
        division: 'West',
        founded: 1883,
        stadium: 'Oracle Park',
        worldSeriesWins: 8,
        colors: ['Orange', 'Black']
      },
      {
        id: 'cubs',
        name: 'Chicago Cubs',
        city: 'Chicago',
        abbreviation: 'CHC',
        league: 'National',
        division: 'Central',
        founded: 1876,
        stadium: 'Wrigley Field',
        worldSeriesWins: 3,
        colors: ['Cubs Blue', 'Red']
      },
      {
        id: 'astros',
        name: 'Houston Astros',
        city: 'Houston',
        abbreviation: 'HOU',
        league: 'American',
        division: 'West',
        founded: 1962,
        stadium: 'Minute Maid Park',
        worldSeriesWins: 2,
        colors: ['Navy Blue', 'Orange']
      }
    ];

    this.players = [
      {
        id: 'aaron-judge',
        name: 'Aaron Judge',
        team: 'yankees',
        position: 'OF',
        number: 99,
        age: 31,
        height: '6\'7"',
        weight: 282,
        bats: 'R',
        throws: 'R'
      },
      {
        id: 'mookie-betts',
        name: 'Mookie Betts',
        team: 'dodgers',
        position: 'OF',
        number: 50,
        age: 30,
        height: '5\'9"',
        weight: 180,
        bats: 'R',
        throws: 'R'
      },
      {
        id: 'rafael-devers',
        name: 'Rafael Devers',
        team: 'red-sox',
        position: '3B',
        number: 11,
        age: 26,
        height: '6\'0"',
        weight: 240,
        bats: 'L',
        throws: 'R'
      }
    ];

    this.standings = {
      2024: [
        { team: 'yankees', wins: 95, losses: 67, pct: 0.586, gb: 0, division: 'AL East' },
        { team: 'dodgers', wins: 98, losses: 64, pct: 0.605, gb: 0, division: 'NL West' },
        { team: 'red-sox', wins: 81, losses: 81, pct: 0.500, gb: 14, division: 'AL East' },
        { team: 'giants', wins: 80, losses: 82, pct: 0.494, gb: 18, division: 'NL West' },
        { team: 'cubs', wins: 83, losses: 79, pct: 0.512, gb: 5, division: 'NL Central' },
        { team: 'astros', wins: 88, losses: 74, pct: 0.543, gb: 0, division: 'AL West' }
      ]
    };
  }

  async getAllTeams() {
    return this.teams.map(team => ({
      ...team,
      logo: `/images/teams/${team.id}.png`
    }));
  }

  async getTeamById(id) {
    const team = this.teams.find(team => team.id === id);
    if (team) {
      return {
        ...team,
        logo: `/images/teams/${team.id}.png`
      };
    }
    return null;
  }

  async getStandings(year = 2024) {
    const yearStandings = this.standings[year] || this.standings[2024];
    return yearStandings.map(standing => {
      const team = this.teams.find(t => t.id === standing.team);
      return {
        ...standing,
        teamName: team ? team.name : 'Unknown Team',
        teamAbbr: team ? team.abbreviation : 'UNK'
      };
    }).sort((a, b) => b.pct - a.pct);
  }

  async getPlayers({ team, position, limit = 50 } = {}) {
    let filteredPlayers = [...this.players];

    if (team) {
      filteredPlayers = filteredPlayers.filter(player => player.team === team);
    }

    if (position) {
      filteredPlayers = filteredPlayers.filter(player => 
        player.position.toLowerCase().includes(position.toLowerCase())
      );
    }

    return filteredPlayers.slice(0, limit).map(player => {
      const team = this.teams.find(t => t.id === player.team);
      return {
        ...player,
        teamName: team ? team.name : 'Unknown Team',
        teamAbbr: team ? team.abbreviation : 'UNK'
      };
    });
  }

  async getStats({ type = 'batting', team, year } = {}) {
    // Sample statistics - in a real app, this would come from a database
    const sampleStats = [
      {
        playerId: 'aaron-judge',
        playerName: 'Aaron Judge',
        team: 'yankees',
        avg: 0.311,
        hr: 62,
        rbi: 131,
        ops: 1.111,
        year: 2024
      },
      {
        playerId: 'mookie-betts',
        playerName: 'Mookie Betts',
        team: 'dodgers',
        avg: 0.305,
        hr: 35,
        rbi: 107,
        ops: 0.892,
        year: 2024
      }
    ];

    let filteredStats = [...sampleStats];

    if (team) {
      filteredStats = filteredStats.filter(stat => stat.team === team);
    }

    if (year) {
      filteredStats = filteredStats.filter(stat => stat.year === parseInt(year));
    }

    return filteredStats;
  }

  async search(query, type = 'all') {
    const results = [];
    const queryLower = query.toLowerCase();

    if (type === 'all' || type === 'teams') {
      const teamResults = this.teams.filter(team =>
        team.name.toLowerCase().includes(queryLower) ||
        team.city.toLowerCase().includes(queryLower) ||
        team.abbreviation.toLowerCase().includes(queryLower)
      ).map(team => ({ ...team, type: 'team' }));
      results.push(...teamResults);
    }

    if (type === 'all' || type === 'players') {
      const playerResults = this.players.filter(player =>
        player.name.toLowerCase().includes(queryLower) ||
        player.position.toLowerCase().includes(queryLower)
      ).map(player => ({ ...player, type: 'player' }));
      results.push(...playerResults);
    }

    return results;
  }
}

module.exports = new MLBModel();