const ContactValidator = require('./contact-validator');
module.exports = options => {
    const {repositories} = options;

    const validators = {};
    validators.contact = new ContactValidator(repositories);

    return validators;
};
