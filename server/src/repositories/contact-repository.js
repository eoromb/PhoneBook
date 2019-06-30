const DefaultError = require('../common/errors/default-error');
const QueryHelper = require('./utils/query-helper');
const updateableFields = ['fname', 'lname', 'phonenumber'];
const schema = 'pb';
const table = 'Contact';
const getTableName = () => `"${schema}"."${table}"`;
/**
 * Contact repository
 */
class ContactRepository {
    /**
     * Constructor
     */
    constructor (contactMapper, dbHelper) {
        if (contactMapper == null) {
            throw new Error('Contact mapper is null');
        }
        if (dbHelper == null) {
            throw new Error('Database helper is null');
        }
        this.contactMapper = contactMapper;
        this.dbHelper = dbHelper;
    }

    /**
     * Adds contact
     * @param {object} params contact  params
     */
    async addContact (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {fname, lname, phonenumber, task} = params;
            const contactEntity = await task.one(`INSERT INTO ${getTableName()} (fname, lname, phonenumber) VALUES($1,$2,$3) RETURNING *`,
                [fname, lname, phonenumber]);
            return this.contactMapper.createContactFromDbEntity(contactEntity);
        }, params);
    }

    /**
     * Adds set of contacts. Update phonenumber if already exists
     * @param {object} params contact  params
     */
    async addOrUpdateContactsByName (params) {
        return this.dbHelper.execTransactional(async params => {
            const {contacts, task} = params;
            const pgp = this.dbHelper.getPgp();
            const cs = new pgp.helpers.ColumnSet(['fname', 'lname', 'phonenumber'], {table: {table, schema}});
            const insertQuery = pgp.helpers.insert(contacts, cs);
            const query = `${insertQuery} ON CONFLICT (LOWER(fname), LOWER(lname)) DO UPDATE SET phonenumber = EXCLUDED.phonenumber RETURNING *`;
            const res = await task.any(query);
            return {inserted: res.length};
        }, params);
    }

    /**
     * Deletes contact
     * @param {object} params contact  params
     */
    async deleteContact (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {id, task} = params;
            await task.any(`DELETE FROM ${getTableName()} WHERE id = $1;`, [id]);
        }, params);
    }

    /**
     * Updates contact
     * @param {object} params contact  params
     */
    async updateContact (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {id, task} = params;
            const contact = await this.getContactById({id, task});
            if (contact == null) {
                throw new DefaultError(`Contact with id = ${id} does not exists`);
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
                const query = `UPDATE ${getTableName()} SET ${setStringArray.join(',')} WHERE id = $${i} RETURNING *;`;
                const updatedContactEntities = await task.any(query, values);
                if (updatedContactEntities.length === 0) {
                    throw new DefaultError(`Unexpected error during contact update. Id: ${id}`);
                }
                return this.contactMapper.createContactFromDbEntity(updatedContactEntities[0]);
            }
            return contact;
        }, params);
    }

    /**
     * Gets contact by id
     * @param {object} params contact  params
     */
    async getContactById (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {task, id} = params;
            const contacts = await task.any(`SELECT * FROM ${getTableName()} WHERE id=$1`, [id]);
            if (contacts.length === 0) {
                return null;
            }
            return this.contactMapper.createContactFromDbEntity(contacts[0]);
        }, params);
    }

    /**
     * Gets contact by fname and lname
     * @param {object} params contact  params
     */
    async getContactByName (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {task, fname, lname} = params;
            if (fname == null || lname == null) {
                return null;
            }
            const contacts = await task.any(`SELECT * FROM ${getTableName()} WHERE lower(fname)=$1 AND lower(lname)=$2`, [fname.toLowerCase(), lname.toLowerCase()]);
            if (contacts.length === 0) {
                return null;
            }
            return this.contactMapper.createContactFromDbEntity(contacts[0]);
        }, params);
    }

    /**
     * Gets contact list
     * @param {object} params contact  params
     */
    async getContactList (params) {
        return this.dbHelper.execNonTransactional(async params => {
            const {page, limit, task, filter} = params;
            const fromQuery = ` FROM ${getTableName()}  `;
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

module.exports = ContactRepository;
