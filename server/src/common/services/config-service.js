/**
 * Configuration service
 */
class ConfigService {
    /**
     * Constructor
     * @param {object} config config object
     */
    constructor (config) {
        this.config = config;
        this.config.database.host = process.env.DB_HOST || this.config.database.host;
        this.config.database.port = process.env.DB_PORT || this.config.database.port;
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
