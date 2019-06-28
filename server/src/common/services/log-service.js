/**
 * Simple log service
 */
class LogService {
    /**
     * Constructor
     * @param {object} logger logger
     */
    constructor (logger = null) {
        this.logger = logger;
    }
    /**
     * Shows error
     * @param {object} error error to show
     */
    error (error) {
        const errorString = error;
        if (this.logger) {
            this.logger.error(errorString);
        } else {
            console.log(errorString);
        }
    }
}
module.exports = LogService;
