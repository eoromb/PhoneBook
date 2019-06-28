class DbHelper {
    constructor (db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    async execNonTransactional (fn, params) {
        params = params || {};
        const {task} = params;
        if (task) {
            return fn(params);
        }
        return await this.db.task('task', async task => {
            return fn({...params, task});
        });
    }

    async execTransactional (fn, params) {
        params = params || {};
        const {task} = params;
        if (task) {
            return fn(params);
        }
        return await this.db.tx('task', async task => {
            return fn({...params, task});
        });
    }

    getPgp () {
        return this.pgp;
    }
}

module.exports = DbHelper;
