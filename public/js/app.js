class MLBApp {
  constructor() {
    this.data = {
      teams: [],
      standings: [],
      players: [],
      stats: []
    };
    this.currentFilters = {
      league: 'all',
      team: '',
      position: '',
      statsType: 'batting',
      year: new Date().getFullYear()
    };
        
    this.init();
  }

  async init() {
    try {
      // Show loading screen
      this.showLoadingScreen();
            
      // Initialize event listeners
      this.initEventListeners();
            
      // Load initial data
      await this.loadInitialData();
            
      // Check API health
      await this.checkAPIHealth();
            
      // Initialize intersection observer for animations
      ui.observeElements();
            
      // Hide loading screen
      this.hideLoadingScreen();
            
      console.log('MLB App initialized successfully');
    } catch (error) {
      console.error('Failed to initialize app:', error);
      ui.showToast('Failed to load application. Please refresh the page.', 'error');
      this.hideLoadingScreen();
    }
  }

  showLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    loadingScreen.classList.remove('hidden');
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1000); // Delay to show the loading animation
  }

  initEventListeners() {
    // Navigation
    this.initNavigation();
        
    // Search functionality
    this.initSearch();
        
    // Filter functionality
    this.initFilters();
        
    // Button interactions
    this.initButtons();
        
    // Toast close buttons
    this.initToasts();
        
    // Mobile menu toggle
    this.initMobileMenu();
  }

  initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        ui.scrollToSection(targetId);
        ui.updateActiveNav(targetId);
                
        // Close mobile menu if open
        document.getElementById('nav-menu').classList.remove('active');
      });
    });

    // Update active nav on scroll
    window.addEventListener('scroll', ui.debounce(() => {
      const sections = document.querySelectorAll('.section, .hero');
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          ui.updateActiveNav(section.id);
        }
      });
    }, 100));
  }

  initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    const performSearch = async () => {
      const query = searchInput.value.trim();
      if (query.length < 2) {
        ui.showToast('Please enter at least 2 characters to search', 'error');
        return;
      }

      try {
        ui.showToast('Searching...', 'success', 2000);
        const response = await api.search(query);
                
        if (response.success) {
          ui.renderSearchResults(response.data, query);
        } else {
          ui.showToast('Search failed. Please try again.', 'error');
        }
      } catch (error) {
        const message = API.handleError(error, 'Search failed');
        ui.showToast(message, 'error');
      }
    };

    // Search on button click
    searchBtn.addEventListener('click', performSearch);

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  initFilters() {
    // Team filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Update active filter
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
                
        // Apply filter
        this.currentFilters.league = e.target.dataset.league;
        ui.renderTeams(this.data.teams, this.currentFilters.league);
      });
    });

    // Standings year filter
    const standingsYear = document.getElementById('standings-year');
    if (standingsYear) {
      standingsYear.addEventListener('change', async (e) => {
        this.currentFilters.year = parseInt(e.target.value);
        await this.loadStandings();
      });
    }

    // Player filters
    const playerTeam = document.getElementById('player-team');
    const playerPosition = document.getElementById('player-position');

    if (playerTeam) {
      playerTeam.addEventListener('change', async (e) => {
        this.currentFilters.team = e.target.value;
        await this.loadPlayers();
      });
    }

    if (playerPosition) {
      playerPosition.addEventListener('change', async (e) => {
        this.currentFilters.position = e.target.value;
        await this.loadPlayers();
      });
    }

    // Stats filters
    const statsType = document.getElementById('stats-type');
    const statsTeam = document.getElementById('stats-team');

    if (statsType) {
      statsType.addEventListener('change', async (e) => {
        this.currentFilters.statsType = e.target.value;
        await this.loadStats();
      });
    }

    if (statsTeam) {
      statsTeam.addEventListener('change', async (e) => {
        this.currentFilters.team = e.target.value;
        await this.loadStats();
      });
    }
  }

  initButtons() {
    // Hero buttons
    const exploreTeamsBtn = document.getElementById('explore-teams');
    const viewStandingsBtn = document.getElementById('view-standings');

    if (exploreTeamsBtn) {
      exploreTeamsBtn.addEventListener('click', () => {
        ui.scrollToSection('teams');
        ui.updateActiveNav('teams');
      });
    }

    if (viewStandingsBtn) {
      viewStandingsBtn.addEventListener('click', () => {
        ui.scrollToSection('standings');
        ui.updateActiveNav('standings');
      });
    }
  }

  initToasts() {
    document.querySelectorAll('.toast-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', () => {
        closeBtn.closest('.toast').classList.remove('show');
      });
    });
  }

  initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
        }
      });
    }
  }

  async loadInitialData() {
    // Load teams first as they're needed for other sections
    await this.loadTeams();
        
    // Load other data in parallel
    await Promise.all([
      this.loadStandings(),
      this.loadPlayers(),
      this.loadStats()
    ]);
  }

  async loadTeams() {
    try {
      ui.showLoading('teams-grid');
            
      const response = await api.getTeams();
            
      if (response.success) {
        this.data.teams = response.data;
        ui.renderTeams(this.data.teams, this.currentFilters.league);
        ui.populateTeamSelects(this.data.teams);
      } else {
        throw new Error('Failed to load teams');
      }
    } catch (error) {
      const message = API.handleError(error, 'Failed to load teams');
      ui.showToast(message, 'error');
      document.getElementById('teams-grid').innerHTML = '<p class="error-message">Failed to load teams. Please try again later.</p>';
    } finally {
      ui.hideLoading('teams-grid');
    }
  }

  async loadStandings() {
    try {
      ui.showLoading('standings-table');
            
      const response = await api.getStandings(this.currentFilters.year);
            
      if (response.success) {
        this.data.standings = response.data;
        ui.renderStandings(this.data.standings);
      } else {
        throw new Error('Failed to load standings');
      }
    } catch (error) {
      const message = API.handleError(error, 'Failed to load standings');
      ui.showToast(message, 'error');
      document.getElementById('standings-table').innerHTML = '<p class="error-message">Failed to load standings. Please try again later.</p>';
    } finally {
      ui.hideLoading('standings-table');
    }
  }

  async loadPlayers() {
    try {
      ui.showLoading('players-grid');
            
      const filters = {};
      if (this.currentFilters.team) filters.team = this.currentFilters.team;
      if (this.currentFilters.position) filters.position = this.currentFilters.position;
            
      const response = await api.getPlayers(filters);
            
      if (response.success) {
        this.data.players = response.data;
        ui.renderPlayers(this.data.players);
      } else {
        throw new Error('Failed to load players');
      }
    } catch (error) {
      const message = API.handleError(error, 'Failed to load players');
      ui.showToast(message, 'error');
      document.getElementById('players-grid').innerHTML = '<p class="error-message">Failed to load players. Please try again later.</p>';
    } finally {
      ui.hideLoading('players-grid');
    }
  }

  async loadStats() {
    try {
      ui.showLoading('stats-content');
            
      const filters = {
        type: this.currentFilters.statsType
      };
      if (this.currentFilters.team) filters.team = this.currentFilters.team;
            
      const response = await api.getStats(filters);
            
      if (response.success) {
        this.data.stats = response.data;
        ui.renderStats(this.data.stats, this.currentFilters.statsType);
      } else {
        throw new Error('Failed to load statistics');
      }
    } catch (error) {
      const message = API.handleError(error, 'Failed to load statistics');
      ui.showToast(message, 'error');
      document.getElementById('stats-content').innerHTML = '<p class="error-message">Failed to load statistics. Please try again later.</p>';
    } finally {
      ui.hideLoading('stats-content');
    }
  }

  async checkAPIHealth() {
    try {
      await api.checkHealth();
      ui.updateAPIStatus(true);
    } catch (error) {
      console.warn('API health check failed:', error);
      ui.updateAPIStatus(false);
    }
  }

  // Public method to refresh data
  async refreshData() {
    ui.showToast('Refreshing data...', 'success', 2000);
    try {
      await this.loadInitialData();
      ui.showToast('Data refreshed successfully!', 'success');
    } catch (error) {
      ui.showToast('Failed to refresh data. Please try again.', 'error');
    }
  }

  // Public method to get current data
  getData(type) {
    return this.data[type] || [];
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create global app instance
  window.mlbApp = new MLBApp();
});

// Handle any unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  ui.showToast('An unexpected error occurred. Please refresh the page.', 'error');
});

// Handle online/offline status
window.addEventListener('online', () => {
  ui.showToast('Connection restored', 'success');
  ui.updateAPIStatus(true);
});

window.addEventListener('offline', () => {
  ui.showToast('Connection lost. Some features may not work.', 'error');
  ui.updateAPIStatus(false);
});