const Joi = require('@hapi/joi');
const ValidatiorResult = require('../common/models/validation-result');

/**
 * Validator for contact operation
 */
class ContactValidator {
    /**
     * @constructor
     * @param {*} repositories repositories
     */
    constructor (repositories) {
        this.contactRepository = repositories.contact;
        if (this.contactRepository == null) {
            throw new Error('There is not repository for contact validator');
        }
        const phoneRegExp = /(^\+?\d{1}-\d{3}-\d{3}-\d{4}$)|(^\+?\d{11}$)/;
        this.contactSchemaAdd = Joi.object().keys({
            fname: Joi.string().alphanum().min(1).max(30).required(),
            lname: Joi.string().alphanum().min(1).max(30).required(),
            phonenumber: Joi.string().regex(phoneRegExp).required()
        });
        this.contactSchemaUpdate = Joi.object().keys({
            fname: Joi.string().alphanum().min(1).max(30),
            lname: Joi.string().alphanum().min(1).max(30),
            phonenumber: Joi.string().regex(phoneRegExp)
        });
    }

    /**
     * Validate add contact operation parameters
     * @param {object} params params
     */
    async addContactValidate (params) {
        const {fname, lname, phonenumber, validateOnlySchema = false} = params;
        const validationResult = new ValidatiorResult();
        const result = Joi.validate({fname, lname, phonenumber}, this.contactSchemaAdd);
        if (result.error) {
            validationResult.addError(result.error.message);
            return validationResult;
        }
        if (validateOnlySchema) {
            return validationResult;
        }
        const contact = await this.contactRepository.getContactByName({fname, lname});
        if (contact != null) {
            validationResult.addError(`Contact with such name already exists. fname: ${fname}. lname: ${lname}`);
            return validationResult;
        }
        return validationResult;
    }

    /**
     * Validates update contact operation parameters
     * @param {number} id contact id
     * @param {*} params params
     */
    async updateContactValidate (id, params) {
        const {fname, lname, phonenumber} = params;
        const validationResult = new ValidatiorResult();
        if (id == null) {
            validationResult.addError('Id are not allowed to be null on contact update');
            return validationResult;
        }
        const result = Joi.validate({fname, lname, phonenumber}, this.contactSchemaUpdate);
        if (result.error) {
            validationResult.addError(result.error.message);
            return validationResult;
        }
        let contact = await this.contactRepository.getContactById({id});
        if (contact == null) {
            validationResult.addError('Contact to update does not exist');
            return validationResult;
        }
        contact = await this.contactRepository.getContactByName({fname, lname});
        if (contact != null && contact.id !== id) {
            validationResult.addError(`Contact with name updated to already exists. fname: ${fname}. lname: ${lname}`);
            return validationResult;
        }
        return validationResult;
    }

    /**
     * Validates delete contact
     * @param {number} id contact id
     */
    async deleteContactValidate (id) {
        const validationResult = new ValidatiorResult();
        if (id == null) {
            validationResult.addError('Id are not allowed to be null on contact delete');
            return validationResult;
        }
        const contact = await this.contactRepository.getContactById({id});
        if (contact == null) {
            validationResult.addError('Contact to delete not exists');
            return validationResult;
        }
        return validationResult;
    }
}

module.exports = ContactValidator;
