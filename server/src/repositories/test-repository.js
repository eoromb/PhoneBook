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
    }
    /**
     * Resets database
     */
    async resetDatabase () {
        const fullPath = path.join(__dirname, './artifacts/schema.sql');
        const resetDatabaseQuery = new this.pgp.QueryFile(fullPath, {minify: true});
        await this.db.any(resetDatabaseQuery, []);
    }
}
module.exports = TestRepository;
