class UI {
    constructor() {
        this.currentSection = 'home';
        this.cache = new Map();
        this.loadingStates = new Set();
    }

    // Toast notifications
    showToast(message, type = 'success', duration = 5000) {
        const toastId = type === 'error' ? 'error-toast' : 'success-toast';
        const toast = document.getElementById(toastId);
        const messageEl = toast.querySelector('.toast-message');
        
        messageEl.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    // Loading states
    showLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '<div class="loading-spinner"></div>';
            this.loadingStates.add(elementId);
        }
    }

    hideLoading(elementId) {
        this.loadingStates.delete(elementId);
    }

    // Smooth scrolling to sections
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Update active navigation
    updateActiveNav(activeSection) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSection}`) {
                link.classList.add('active');
            }
        });
        this.currentSection = activeSection;
    }

    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
        }).format(amount);
    }

    // Format numbers
    formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(num);
    }

    // Format percentages
    formatPercentage(num, decimals = 3) {
        return (num).toFixed(decimals);
    }

    // Create team logo placeholder
    createTeamLogo(teamId, teamName) {
        const logo = document.createElement('div');
        logo.className = 'team-logo';
        logo.textContent = teamName.split(' ').map(word => word[0]).join('').substring(0, 3);
        return logo;
    }

    // Create player avatar
    createPlayerAvatar(playerName) {
        const avatar = document.createElement('div');
        avatar.className = 'player-avatar';
        const initials = playerName.split(' ').map(name => name[0]).join('').substring(0, 2);
        avatar.textContent = initials;
        return avatar;
    }

    // Render teams
    renderTeams(teams, filteredLeague = 'all') {
        const container = document.getElementById('teams-grid');
        const filteredTeams = filteredLeague === 'all' 
            ? teams 
            : teams.filter(team => team.league === filteredLeague);

        if (filteredTeams.length === 0) {
            container.innerHTML = '<p class="no-results">No teams found.</p>';
            return;
        }

        container.innerHTML = filteredTeams.map(team => `
            <div class="team-card" data-team-id="${team.id}">
                <div class="team-header">
                    <div class="team-logo">${team.abbreviation}</div>
                    <div class="team-info">
                        <h3>${team.name}</h3>
                        <p>${team.city} • ${team.league} League</p>
                    </div>
                </div>
                <div class="team-details">
                    <div class="team-detail">
                        <span>Division:</span>
                        <span>${team.division}</span>
                    </div>
                    <div class="team-detail">
                        <span>Founded:</span>
                        <span>${team.founded}</span>
                    </div>
                    <div class="team-detail">
                        <span>Stadium:</span>
                        <span>${team.stadium}</span>
                    </div>
                    <div class="team-detail">
                        <span>World Series:</span>
                        <span>${team.worldSeriesWins}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Add click handlers for team cards
        container.querySelectorAll('.team-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const teamId = e.currentTarget.dataset.teamId;
                this.showTeamDetails(teamId);
            });
        });
    }

    // Show team details (could open a modal or navigate to a detail page)
    showTeamDetails(teamId) {
        this.showToast(`Showing details for team: ${teamId}`, 'success');
        // In a real app, this might open a modal or navigate to a detail page
    }

    // Render standings
    renderStandings(standings) {
        const container = document.getElementById('standings-table');
        
        if (!standings || standings.length === 0) {
            container.innerHTML = '<p class="no-results">No standings data available.</p>';
            return;
        }

        const tableHTML = `
            <table class="standings-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>PCT</th>
                        <th>GB</th>
                        <th>Division</th>
                    </tr>
                </thead>
                <tbody>
                    ${standings.map((team, index) => `
                        <tr>
                            <td>${index + 1}</td>
                            <td>
                                <strong>${team.teamAbbr}</strong>
                                <br>
                                <small>${team.teamName}</small>
                            </td>
                            <td>${team.wins}</td>
                            <td>${team.losses}</td>
                            <td>${this.formatPercentage(team.pct)}</td>
                            <td>${team.gb === 0 ? '—' : team.gb}</td>
                            <td>${team.division}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        container.innerHTML = tableHTML;
    }

    // Render players
    renderPlayers(players) {
        const container = document.getElementById('players-grid');
        
        if (!players || players.length === 0) {
            container.innerHTML = '<p class="no-results">No players found.</p>';
            return;
        }

        container.innerHTML = players.map(player => `
            <div class="player-card" data-player-id="${player.id}">
                <div class="player-avatar">${player.name.split(' ').map(n => n[0]).join('').substring(0, 2)}</div>
                <div class="player-name">${player.name}</div>
                <div class="player-team">${player.teamName} (#${player.number})</div>
                <div class="player-stats">
                    <div class="player-stat">
                        <span>Position</span>
                        <span>${player.position}</span>
                    </div>
                    <div class="player-stat">
                        <span>Age</span>
                        <span>${player.age}</span>
                    </div>
                    <div class="player-stat">
                        <span>Height</span>
                        <span>${player.height}</span>
                    </div>
                    <div class="player-stat">
                        <span>Bats/Throws</span>
                        <span>${player.bats}/${player.throws}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render statistics
    renderStats(stats, type = 'batting') {
        const container = document.getElementById('stats-content');
        
        if (!stats || stats.length === 0) {
            container.innerHTML = '<p class="no-results">No statistics available.</p>';
            return;
        }

        const tableHTML = `
            <table class="stats-table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Team</th>
                        ${type === 'batting' ? `
                            <th>AVG</th>
                            <th>HR</th>
                            <th>RBI</th>
                            <th>OPS</th>
                        ` : `
                            <th>ERA</th>
                            <th>W</th>
                            <th>L</th>
                            <th>SO</th>
                        `}
                    </tr>
                </thead>
                <tbody>
                    ${stats.map(stat => `
                        <tr>
                            <td><strong>${stat.playerName}</strong></td>
                            <td>${stat.team?.toUpperCase() || 'N/A'}</td>
                            ${type === 'batting' ? `
                                <td>${this.formatPercentage(stat.avg)}</td>
                                <td>${stat.hr || 0}</td>
                                <td>${stat.rbi || 0}</td>
                                <td>${this.formatPercentage(stat.ops)}</td>
                            ` : `
                                <td>${stat.era || 'N/A'}</td>
                                <td>${stat.wins || 0}</td>
                                <td>${stat.losses || 0}</td>
                                <td>${stat.strikeouts || 0}</td>
                            `}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        container.innerHTML = tableHTML;
    }

    // Populate team select dropdowns
    populateTeamSelects(teams) {
        const selects = document.querySelectorAll('#player-team, #stats-team');
        
        selects.forEach(select => {
            // Clear existing options except the first one
            while (select.children.length > 1) {
                select.removeChild(select.lastChild);
            }
            
            // Add team options
            teams.forEach(team => {
                const option = document.createElement('option');
                option.value = team.id;
                option.textContent = team.name;
                select.appendChild(option);
            });
        });
    }

    // Update API status indicator
    updateAPIStatus(isOnline = true) {
        const statusIndicator = document.getElementById('api-status');
        const statusDot = statusIndicator.querySelector('.status-dot');
        
        if (isOnline) {
            statusDot.classList.remove('error');
            statusIndicator.title = 'API is online and responding';
        } else {
            statusDot.classList.add('error');
            statusIndicator.title = 'API is offline or not responding';
        }
    }

    // Handle search results
    renderSearchResults(results, query) {
        if (results.length === 0) {
            this.showToast(`No results found for "${query}"`, 'error');
            return;
        }

        // For now, just show a toast with the number of results
        // In a real app, you might show results in a modal or dedicated section
        this.showToast(`Found ${results.length} result(s) for "${query}"`, 'success');
        
        // You could expand this to show actual search results
        console.log('Search results:', results);
    }

    // Utility function to debounce function calls
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Animate elements when they come into view
    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe all cards and sections
        document.querySelectorAll('.team-card, .player-card, .section').forEach(el => {
            observer.observe(el);
        });
    }
}

// Create a global UI instance
window.ui = new UI();