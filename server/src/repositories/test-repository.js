const path = require('path');
/**
 * Repository for test cases
 */
class TestRepository {
    /**
     * Constructor
     * @param {object} db pg client
     * @param {object} pgp pg promise object
     */
    constructor (db, pgp) {
        this.db = db;
        this.pgp = pgp;
        this.resetDatabaseQuery = null;
    }
    /**
     * Resets database
     */
    async resetDatabase () {
        if (this.resetDatabaseQuery == null) {
            const fullPath = path.join(__dirname, './artifacts/schema.sql');
            this.resetDatabaseQuery = new this.pgp.QueryFile(fullPath, {minify: true});
        }
        await this.db.any(this.resetDatabaseQuery, []);
    }
}
module.exports = TestRepository;
