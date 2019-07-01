const winston = require('winston');
/**
 * Gets logger object
 */
function getLogger ({mode = 'debug'} = {}) {
    return winston.createLogger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: mode,
                format: winston.format.combine(
                    winston.format.splat(),
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })
        ]
    });
}

module.exports = getLogger;
