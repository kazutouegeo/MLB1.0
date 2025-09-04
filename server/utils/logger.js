const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logDir = path.join(__dirname, '../../logs');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  }

  writeToFile(level, message) {
    const logFile = path.join(this.logDir, `${level}.log`);
    const formattedMessage = this.formatMessage(level, message) + '\n';
    
    fs.appendFileSync(logFile, formattedMessage);
    
    // Also write to combined log
    const combinedLogFile = path.join(this.logDir, 'combined.log');
    fs.appendFileSync(combinedLogFile, formattedMessage);
  }

  info(message) {
    console.log(this.formatMessage('info', message));
    this.writeToFile('info', message);
  }

  error(message) {
    console.error(this.formatMessage('error', message));
    this.writeToFile('error', message);
  }

  warn(message) {
    console.warn(this.formatMessage('warn', message));
    this.writeToFile('warn', message);
  }

  debug(message) {
    if (process.env.NODE_ENV === 'development') {
      console.log(this.formatMessage('debug', message));
      this.writeToFile('debug', message);
    }
  }

  get stream() {
    return {
      write: (message) => {
        this.info(message.trim());
      }
    };
  }
}

module.exports = new Logger();