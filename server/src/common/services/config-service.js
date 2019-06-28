/**
 * Config service
 */
class ConfigService {
    /**
     * Constructor
     * @param {object} config config object
     */
    constructor (config) {
        this.config = config;
    }
    /**
     * Gets database configuration
     * @returns {object}
     */
    getDatabaseConfig () {
        return this.config.database;
    }
}
module.exports = ConfigService;
