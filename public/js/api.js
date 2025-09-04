class API {
  constructor() {
    this.baseURL = window.location.origin + '/api';
    this.endpoints = {
      teams: '/mlb/teams',
      standings: '/mlb/standings',
      players: '/mlb/players',
      stats: '/mlb/stats',
      search: '/mlb/search',
      health: '/health'
    };
  }

  async request(endpoint, options = {}) {
    const url = this.baseURL + endpoint;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
            
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
            
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Teams endpoints
  async getTeams() {
    return this.request(this.endpoints.teams);
  }

  async getTeam(id) {
    return this.request(`${this.endpoints.teams}/${id}`);
  }

  // Standings endpoints
  async getStandings(year) {
    const params = year ? `?year=${year}` : '';
    return this.request(this.endpoints.standings + params);
  }

  // Players endpoints
  async getPlayers(filters = {}) {
    const params = new URLSearchParams();
        
    if (filters.team) params.append('team', filters.team);
    if (filters.position) params.append('position', filters.position);
    if (filters.limit) params.append('limit', filters.limit);

    const queryString = params.toString();
    const url = queryString ? `${this.endpoints.players}?${queryString}` : this.endpoints.players;
        
    return this.request(url);
  }

  // Stats endpoints
  async getStats(filters = {}) {
    const params = new URLSearchParams();
        
    if (filters.type) params.append('type', filters.type);
    if (filters.team) params.append('team', filters.team);
    if (filters.year) params.append('year', filters.year);

    const queryString = params.toString();
    const url = queryString ? `${this.endpoints.stats}?${queryString}` : this.endpoints.stats;
        
    return this.request(url);
  }

  // Search endpoint
  async search(query, type = 'all') {
    return this.request(this.endpoints.search, {
      method: 'POST',
      body: JSON.stringify({ query, type })
    });
  }

  // Health check
  async checkHealth() {
    return this.request(this.endpoints.health);
  }

  // Utility method for handling errors
  static handleError(error, customMessage = 'An error occurred') {
    console.error('API Error:', error);
        
    let message = customMessage;
        
    if (error.message.includes('Failed to fetch')) {
      message = 'Network error. Please check your connection.';
    } else if (error.message.includes('500')) {
      message = 'Server error. Please try again later.';
    } else if (error.message.includes('404')) {
      message = 'The requested resource was not found.';
    } else if (error.message.includes('400')) {
      message = 'Invalid request. Please check your input.';
    }
        
    return message;
  }
}

// Create a global API instance
window.api = new API();