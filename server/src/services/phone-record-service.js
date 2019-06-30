const ValidationError = require('../common/errors/validation-error');
const NotFoundError = require('../common/errors/notfound-error');

/**
 * Phone record service
 */
class PhoneRecordService {
    /**
     * Constructor
     * @param {object} params params
     */
    constructor ({repositories, validators}) {
        this.phoneRecordRepository = repositories.phonerecord;
        this.recordValidator = validators.phonerecord;
        if (this.phoneRecordRepository == null) {
            throw new Error('Phone record repository is null');
        }
        if (this.recordValidator == null) {
            throw new Error('Phone record validator is null');
        }
    }

    /**
     * Adds record into phone book
     * @param {string} fname first name
     * @param {string} lname last name
     * @param {string} phonenumber phone
     */
    async addRecord ({fname, lname, phonenumber}) {
        const validationResult = await this.recordValidator.addRecordValidate({fname, lname, phonenumber});
        if (!validationResult.getValid()) {
            throw new ValidationError(validationResult);
        }
        return this.phoneRecordRepository.addRecord({fname, lname, phonenumber});
    }

    /**
     * Adds or update records by name
     * @param records
     * @return {Promise<void>}
     */
    async addOrUpdateRecordsByName ({records}) {
        if (!Array.isArray(records)) {
            throw new Error('Records is null');
        }
        for (const record of records) {
            const {fname, lname, phonenumber} = record;
            const validationResult = await this.recordValidator.addRecordValidate({fname, lname, phonenumber, validateOnlySchema: true});
            if (!validationResult.getValid()) {
                throw new ValidationError(validationResult);
            }
        }
        return this.phoneRecordRepository.addOrUpdateRecordsByName({records});
    }

    /**
     * Deletes records
     * @param {number} id record id
     */
    async deleteRecord (id) {
        const validationResult = await this.recordValidator.deleteRecordValidate(id);
        if (!validationResult.getValid()) {
            throw new ValidationError(validationResult);
        }
        return this.phoneRecordRepository.deleteRecord({id});
    }

    /**
     * Ges record
     * @param {number} id record id
     */
    async getRecord (id) {
        const record = await this.phoneRecordRepository.getRecordById({id});
        if (record == null) {
            throw new NotFoundError(`Record does not exist. Id: ${id}`);
        }
        return record;
    }

    /**
     * Updates record
     * @param {number} id record id
     * @param {string} fname first name
     * @param {stirng} lname last name
     * @param {string} phonenumber phone number
     */
    async updateRecord (id, {fname, lname, phonenumber}) {
        const validationResult = await this.recordValidator.updateRecordValidate(id, {fname, lname, phonenumber});
        if (!validationResult.getValid()) {
            throw new ValidationError(validationResult);
        }
        return this.phoneRecordRepository.updateRecord({id, fname, lname, phonenumber});
    }

    /**
     * Get phone records list
     * @param {object} params params
     */
    async getRecordList ({page, limit, filter}) {
        return this.phoneRecordRepository.getRecordList({page, limit, filter});
    }
}

module.exports = PhoneRecordService;
