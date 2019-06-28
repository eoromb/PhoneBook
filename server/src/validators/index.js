const PhoneRecordValidator = require('./phone-record-validator');
module.exports = options => {
    const {repositories} = options;

    const validators = {};
    validators.phonerecord = new PhoneRecordValidator(repositories);

    return validators;
};
