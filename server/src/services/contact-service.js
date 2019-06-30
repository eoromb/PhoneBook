const ValidationError = require('../common/errors/validation-error');
const NotFoundError = require('../common/errors/notfound-error');

/**
 * Contact service
 */
class ContactService {
    /**
     * Constructor
     * @param {object} params params
     */
    constructor ({repositories, validators}) {
        this.contactRepository = repositories.contact;
        this.contactValidator = validators.contact;
        if (this.contactRepository == null) {
            throw new Error('Contact repository is null');
        }
        if (this.contactValidator == null) {
            throw new Error('Contact validator is null');
        }
    }

    /**
     * Adds contact into phone book
     * @param {string} fname first name
     * @param {string} lname last name
     * @param {string} phonenumber phone
     */
    async addContact ({fname, lname, phonenumber}) {
        const validationResult = await this.contactValidator.addContactValidate({fname, lname, phonenumber});
        if (!validationResult.getValid()) {
            throw new ValidationError(validationResult);
        }
        return this.contactRepository.addContact({fname, lname, phonenumber});
    }

    /**
     * Adds or update contacts by name
     * @param contacts
     * @return {Promise<void>}
     */
    async addOrUpdateContactsByName ({contacts}) {
        if (!Array.isArray(contacts)) {
            throw new Error('Contacts is null');
        }
        for (const contact of contacts) {
            const {fname, lname, phonenumber} = contact;
            const validationResult = await this.contactValidator.addContactValidate({fname, lname, phonenumber, validateOnlySchema: true});
            if (!validationResult.getValid()) {
                throw new ValidationError(validationResult);
            }
        }
        return this.contactRepository.addOrUpdateContactsByName({contacts});
    }

    /**
     * Deletes contacts
     * @param {number} id contact id
     */
    async deleteContact (id) {
        const validationResult = await this.contactValidator.deleteContactValidate(id);
        if (!validationResult.getValid()) {
            throw new ValidationError(validationResult);
        }
        return this.contactRepository.deleteContact({id});
    }

    /**
     * Ges contact
     * @param {number} id contact id
     */
    async getContact (id) {
        const contact = await this.contactRepository.getContactById({id});
        if (contact == null) {
            throw new NotFoundError(`Contact does not exist. Id: ${id}`);
        }
        return contact;
    }

    /**
     * Updates contact
     * @param {number} id contact id
     * @param {string} fname first name
     * @param {stirng} lname last name
     * @param {string} phonenumber phone number
     */
    async updateContact (id, {fname, lname, phonenumber}) {
        const validationResult = await this.contactValidator.updateContactValidate(id, {fname, lname, phonenumber});
        if (!validationResult.getValid()) {
            throw new ValidationError(validationResult);
        }
        return this.contactRepository.updateContact({id, fname, lname, phonenumber});
    }

    /**
     * Get contacts list
     * @param {object} params params
     */
    async getContactList ({page, limit, filter}) {
        return this.contactRepository.getContactList({page, limit, filter});
    }
}

module.exports = ContactService;
