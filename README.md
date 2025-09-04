# MLB 1.0 ⚾

> A modern, secure, and production-ready web application for Major League Baseball statistics and information.

## 🚀 Features

- **Modern Web Application**: Responsive design that works on desktop, tablet, and mobile
- **Real-time MLB Data**: Teams, players, standings, and statistics
- **Secure API**: Rate limiting, input validation, and security headers
- **Search Functionality**: Search across teams, players, and statistics  
- **Interactive UI**: Smooth animations, loading states, and toast notifications
- **Production Ready**: Docker support, logging, monitoring, and deployment configurations

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js** - Web server and API
- **Security**: Helmet.js, CORS, Rate limiting, Input validation
- **Logging**: Custom logger with file-based storage
- **Testing**: Jest with Supertest for API testing

### Frontend  
- **Vanilla JavaScript** - No framework dependencies for better performance
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **Responsive Design** - Mobile-first approach with breakpoints
- **Progressive Enhancement** - Works without JavaScript enabled

### DevOps & Deployment
- **Docker** - Containerization with multi-stage builds
- **Nginx** - Reverse proxy and static file serving
- **PM2** - Process management for Node.js
- **ESLint** - Code linting and style enforcement
- **Jest** - Unit and integration testing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm 8+
- Docker (optional)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/kazutouegeo/MLB1.0.git
cd MLB1.0

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
# or
npm start

# Open browser to http://localhost:3000
```

### Docker Installation
```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t mlb-1.0 .
docker run -p 3000:3000 mlb-1.0
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test -- --coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## 🏗️ API Documentation

### Endpoints

#### Teams
- `GET /api/mlb/teams` - Get all MLB teams
- `GET /api/mlb/teams/:id` - Get specific team details

#### Standings  
- `GET /api/mlb/standings` - Get current standings
- `GET /api/mlb/standings?year=2023` - Get standings for specific year

#### Players
- `GET /api/mlb/players` - Get all players
- `GET /api/mlb/players?team=yankees` - Filter by team
- `GET /api/mlb/players?position=OF` - Filter by position

#### Statistics
- `GET /api/mlb/stats` - Get batting statistics
- `GET /api/mlb/stats?type=pitching` - Get pitching statistics
- `GET /api/mlb/stats?team=yankees` - Filter by team

#### Search
- `POST /api/mlb/search` - Search teams and players
  ```json
  {
    "query": "Yankees",
    "type": "teams" // optional: teams, players, or all
  }
  ```

#### Health Check
- `GET /health` - Application health status

### Response Format
```json
{
  "success": true,
  "count": 6,
  "data": [...],
  "message": "Optional message"
}
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: All API endpoints validate and sanitize input
- **Security Headers**: XSS protection, content security policy, frame options
- **CORS**: Configurable cross-origin resource sharing
- **Error Handling**: Secure error responses without sensitive information
- **Request Logging**: Comprehensive logging of all requests and errors

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed production deployment instructions.

### Environment Variables
```bash
NODE_ENV=production
PORT=3000
API_BASE_URL=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## 📁 Project Structure

```
MLB1.0/
├── server/
│   ├── index.js              # Main server file
│   ├── routes/               # API route handlers
│   ├── models/               # Data models
│   ├── middleware/           # Custom middleware
│   └── utils/                # Utility functions
├── public/
│   ├── index.html           # Main HTML file
│   ├── css/                 # Stylesheets
│   ├── js/                  # Frontend JavaScript
│   └── images/              # Static images
├── __tests__/               # Test files
├── logs/                    # Application logs
├── Dockerfile               # Docker configuration
├── docker-compose.yml       # Docker Compose setup
├── nginx.conf              # Nginx configuration
└── package.json            # Node.js dependencies
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with MLB branding
- **Responsive Layout**: Optimized for all screen sizes
- **Loading States**: Smooth loading animations and skeleton screens  
- **Error Handling**: User-friendly error messages and recovery
- **Search**: Real-time search with autocomplete
- **Animations**: Subtle animations and micro-interactions
- **Accessibility**: WCAG compliant with proper ARIA labels

## 📊 Performance

- **Optimized Assets**: Minified CSS and JavaScript
- **Image Optimization**: Properly sized and formatted images
- **Caching**: Browser caching for static assets
- **Compression**: Gzip compression enabled
- **Lazy Loading**: Images and content loaded on demand
- **API Optimization**: Efficient data queries and pagination

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation as needed
- Use semantic commit messages

## 📈 Monitoring

### Health Checks
- Application health: `GET /health`
- Frontend status indicator shows API connectivity
- Docker health checks for container orchestration

### Logging
- Request logging with Morgan
- Error logging with custom logger
- Log rotation for production environments
- Structured logging for better searchability

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Change port in .env file
PORT=3001
```

**Permission errors**
```bash
# Fix file permissions
chmod -R 755 .
```

**API not responding**
```bash
# Check health endpoint
curl http://localhost:3000/health
```

### Debug Mode
```bash
# Enable debug logging
NODE_ENV=development npm start
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- MLB for providing inspiration for this application
- Express.js and Node.js communities
- Contributors and beta testers

---

Made with ❤️ for baseball fans everywhere ⚾