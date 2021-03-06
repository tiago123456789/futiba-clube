const winston = require('winston');

// Define settings transports winston.
const options = {
  file: {
    level: 'info',
    filename: `./logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// Instantiate a new Winston logger.
const logger = new (winston.Logger)({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false,
});

// create a stream object with a 'write' function that will be used to the `morgan`
logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;