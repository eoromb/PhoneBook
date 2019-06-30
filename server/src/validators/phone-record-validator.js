const Joi = require('@hapi/joi');
const ValidatiorResult = require('../common/models/validation-result');

/**
 * Validator for phone record operation
 */
class PhoneRecordValidator {
    /**
     * @constructor
     * @param {*} repositories repositories
     */
    constructor (repositories) {
        this.phoneRecordRepository = repositories.phonerecord;
        if (this.phoneRecordRepository == null) {
            throw new Error('There is not repository for phone record validator');
        }
        const phoneRegExp = /(^\+?\d{1}-\d{3}-\d{3}-\d{4}$)|(^\+?\d{11}$)/;
        this.recordSchemaAdd = Joi.object().keys({
            fname: Joi.string().alphanum().min(1).max(30).required(),
            lname: Joi.string().alphanum().min(1).max(30).required(),
            phonenumber: Joi.string().regex(phoneRegExp).required()
        });
        this.recordSchemaUpdate = Joi.object().keys({
            fname: Joi.string().alphanum().min(1).max(30),
            lname: Joi.string().alphanum().min(1).max(30),
            phonenumber: Joi.string().regex(phoneRegExp)
        });
    }

    /**
     * Validate add record operation parameters
     * @param {object} params params
     */
    async addRecordValidate (params) {
        const {fname, lname, phonenumber, validateOnlySchema = false} = params;
        const validationResult = new ValidatiorResult();
        const result = Joi.validate({fname, lname, phonenumber}, this.recordSchemaAdd);
        if (result.error) {
            validationResult.addError(result.error.message);
            return validationResult;
        }
        if (validateOnlySchema) {
            return validationResult;
        }
        const record = await this.phoneRecordRepository.getRecordByName({fname, lname});
        if (record != null) {
            validationResult.addError(`Record with such name already exists. fname: ${fname}. lname: ${lname}`);
            return validationResult;
        }
        return validationResult;
    }

    /**
     * Validates update record operation parameters
     * @param {number} id record id
     * @param {*} params params
     */
    async updateRecordValidate (id, params) {
        const {fname, lname, phonenumber} = params;
        const validationResult = new ValidatiorResult();
        if (id == null) {
            validationResult.addError('Id are not allowed to be null on record update');
            return validationResult;
        }
        const result = Joi.validate({fname, lname, phonenumber}, this.recordSchemaUpdate);
        if (result.error) {
            validationResult.addError(result.error.message);
            return validationResult;
        }
        let record = await this.phoneRecordRepository.getRecordById({id});
        if (record == null) {
            validationResult.addError('Record to update does not exist');
            return validationResult;
        }
        record = await this.phoneRecordRepository.getRecordByName({fname, lname});
        if (record != null && record.id !== id) {
            validationResult.addError(`Record with name updated to already exists. fname: ${fname}. lname: ${lname}`);
            return validationResult;
        }
        return validationResult;
    }

    /**
     * Validates delete record
     * @param {number} id record id
     */
    async deleteRecordValidate (id) {
        const validationResult = new ValidatiorResult();
        if (id == null) {
            validationResult.addError('Id are not allowed to be null on record delete');
            return validationResult;
        }
        const record = await this.phoneRecordRepository.getRecordById({id});
        if (record == null) {
            validationResult.addError('Record to delete not exists');
            return validationResult;
        }
        return validationResult;
    }
}

module.exports = PhoneRecordValidator;
