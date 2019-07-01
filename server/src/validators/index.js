const ContactValidator = require('./contact-validator');
/**
 * Composition root for validators
 */
module.exports = options => {
    const {repositories} = options;

    const validators = {};
    validators.contact = new ContactValidator(repositories);

    return validators;
};
