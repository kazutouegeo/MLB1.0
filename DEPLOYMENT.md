# MLB 1.0 - Deployment Guide

## Production Environment Variables
Create a `.env` file with the following variables for production:

```bash
NODE_ENV=production
PORT=3000
API_BASE_URL=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
LOG_LEVEL=info
```

## Docker Deployment

### Building and Running with Docker
```bash
# Build the image
docker build -t mlb-1.0 .

# Run the container
docker run -d \
  --name mlb-1.0-app \
  -p 3000:3000 \
  --env-file .env \
  mlb-1.0
```

### Using Docker Compose
```bash
# Start the application with nginx proxy
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## Manual Deployment

### Prerequisites
- Node.js 18+ 
- npm 8+
- PM2 (for process management)

### Steps
```bash
# Install dependencies
npm ci --only=production

# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start server/index.js --name "mlb-1.0"

# Setup PM2 to restart on boot
pm2 startup
pm2 save
```

### Nginx Configuration
For production with Nginx, copy the `nginx.conf` file to your Nginx configuration directory and adjust the server name and SSL certificates as needed.

## Security Checklist

### ✅ Implemented Security Features
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: All API endpoints validate input
- **Security Headers**: Helmet.js with CSP, XSS protection
- **CORS Configuration**: Restricted to allowed origins
- **Error Handling**: No sensitive information in error responses
- **Logging**: Comprehensive request and error logging

### 🔒 Additional Security Recommendations
- Use HTTPS in production (SSL certificates)
- Implement API key authentication for sensitive operations
- Set up monitoring and alerting (e.g., Datadog, New Relic)
- Regular security updates for dependencies
- Consider using a Web Application Firewall (WAF)

## Performance Optimizations

### ✅ Implemented Optimizations
- **Static File Caching**: CSS/JS/Images cached with proper headers
- **Gzip Compression**: Enabled in nginx configuration
- **Rate Limiting**: Prevents API abuse
- **Efficient Database Queries**: Optimized data retrieval
- **Minified Assets**: Production-ready CSS and JS

### 📈 Additional Performance Recommendations
- Implement Redis caching for frequently accessed data
- Use CDN for static assets
- Database connection pooling if using external database
- Enable HTTP/2 in nginx
- Monitor and optimize API response times

## Monitoring and Maintenance

### Health Checks
- Application health: `GET /health`
- API status indicator in frontend
- Docker health checks configured

### Logging
- Application logs stored in `./logs/`
- Separate files for different log levels
- Log rotation recommended for production

### Backup Strategy
- Regular backups of log files
- Export/import data functionality
- Configuration file backups

## Scaling Considerations

### Horizontal Scaling
- Load balancer configuration with nginx
- Multiple application instances with PM2 cluster mode
- Database replication for read scaling

### Vertical Scaling  
- Monitor memory and CPU usage
- Optimize Node.js memory settings if needed
- Database optimization for larger datasets

## Troubleshooting

### Common Issues
1. **Port already in use**: Change PORT environment variable
2. **Permission denied**: Check file permissions and user ownership
3. **Memory issues**: Monitor with `npm run health-check`
4. **CORS errors**: Verify allowed origins in server configuration

### Debug Mode
```bash
# Enable debug logging
NODE_ENV=development npm start

# Check application health
curl http://localhost:3000/health
```

## Environment-Specific Configurations

### Development
```bash
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
```

### Staging
```bash
NODE_ENV=staging
PORT=3000
LOG_LEVEL=info
API_BASE_URL=https://staging.yourdomain.com
```

### Production
```bash
NODE_ENV=production  
PORT=3000
LOG_LEVEL=warn
API_BASE_URL=https://yourdomain.com
RATE_LIMIT_MAX=1000
```