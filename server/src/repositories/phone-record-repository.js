const DefaultError = require('../common/errors/default-error');
const QueryHelper = require('./utils/query-helper');
const updateableFields = ['fname', 'lname', 'phonenumber'];

/**
 * Phone record repository
 */
class PhoneRecordRepository {
    /**
     * Constructor
     */
    constructor (recordMapper, dbHelper) {
        if (recordMapper == null) {
            throw new Error('Record mapper is null');
        }
        if (dbHelper == null) {
            throw new Error('Database helper is null');
        }
        this.recordMapper = recordMapper;
        this.dbHelper = dbHelper;
    }

    /**
     * Adds record
     * @param {object} params record  params
     */
    async addRecord (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {fname, lname, phonenumber, task} = params;
            const recordEntity = await task.one('INSERT INTO "pb"."PhoneRecord" (fname, lname, phonenumber) VALUES($1,$2,$3) RETURNING *',
                [fname, lname, phonenumber]);
            return this.recordMapper.createPhoneRecordFromDbEntity(recordEntity);
        }, params);
    }

    /**
     * Adds set of records. Update phonenumber if already exists
     * @param {object} params record  params
     */
    async addOrUpdateRecordsByName (params) {
        return this.dbHelper.execTransactional(async params => {
            const {records, task} = params;
            const pgp = this.dbHelper.getPgp();
            const cs = new pgp.helpers.ColumnSet(['fname', 'lname', 'phonenumber'], {table: {table: 'PhoneRecord', schema: 'pb'}});
            const insertQuery = pgp.helpers.insert(records, cs);
            const query = `${insertQuery} ON CONFLICT (LOWER(fname), LOWER(lname)) DO UPDATE SET phonenumber = EXCLUDED.phonenumber RETURNING *`;
            const res = await task.any(query);
            return {inserted: res.length};
        }, params);
    }

    /**
     * Deletes record
     * @param {object} params record  params
     */
    async deleteRecord (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {id, task} = params;
            await task.any('DELETE FROM "pb"."PhoneRecord" WHERE id = $1;', [id]);
        }, params);
    }

    /**
     * Updates record
     * @param {object} params record  params
     */
    async updateRecord (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {id, task} = params;
            const record = await this.getRecordById({id, task});
            if (record == null) {
                throw new DefaultError(`Record with id = ${id} does not exists`);
            }
            const updatedFields = updateableFields.filter(field => params[field] != null);
            if (updatedFields.length > 0) {
                const setStringArray = [];
                const values = [];
                let i = 1;
                for (const field of updatedFields) {
                    setStringArray.push(`${field} = $${i}`);
                    values.push(params[field]);
                    i++;
                }
                values.push(id);
                const query = `UPDATE "pb"."PhoneRecord" SET ${setStringArray.join(',')} WHERE id = $${i} RETURNING *;`;
                const updatedRecordEntities = await task.any(query, values);
                if (updatedRecordEntities.length === 0) {
                    throw new DefaultError(`Unexpected error during phone record update. Id: ${id}`);
                }
                return this.recordMapper.createPhoneRecordFromDbEntity(updatedRecordEntities[0]);
            }
            return record;
        }, params);
    }

    /**
     * Gets record by id
     * @param {object} params record  params
     */
    async getRecordById (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {task, id} = params;
            const records = await task.any('SELECT * FROM "pb"."PhoneRecord" WHERE id=$1', [id]);
            if (records.length === 0) {
                return null;
            }
            return this.recordMapper.createPhoneRecordFromDbEntity(records[0]);
        }, params);
    }

    /**
     * Gets record by fname and lname
     * @param {object} params record  params
     */
    async getRecordByName (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {task, fname, lname} = params;
            if (fname == null || lname == null) {
                return null;
            }
            const records = await task.any('SELECT * FROM "pb"."PhoneRecord" WHERE lower(fname)=$1 AND lower(lname)=$2', [fname.toLowerCase(), lname.toLowerCase()]);
            if (records.length === 0) {
                return null;
            }
            return this.recordMapper.createPhoneRecordFromDbEntity(records[0]);
        }, params);
    }

    /**
     * Gets record list
     * @param {object} params record  params
     */
    async getRecordList (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {page, limit, task, filter} = params;
            const fromQuery = ` FROM "pb"."PhoneRecord"  `;
            // const countQuery = `SELECT COUNT(*) as count ${fromQuery} `;
            // const countQueryValues = [];
            const {query: countQuery, values: countQueryValues} =
                QueryHelper.addFilter({query: `SELECT COUNT(*) as count ${fromQuery} `, values: [], filter});
            const {query: listQuery, values: listQueryValues} =
                QueryHelper.addPagination({
                    ...QueryHelper.addSort({
                        ...QueryHelper.addFilter({query: `SELECT * ${fromQuery} `, values: [], filter}),
                        sort: 'id'
                    }),
                    page, limit
                });
            const listResult = await task.any(listQuery, listQueryValues);
            const countResult = await task.one(countQuery, countQueryValues);
            return {
                rows: listResult,
                total: +countResult.count
            };
        }, params);
    }
}

module.exports = PhoneRecordRepository;
