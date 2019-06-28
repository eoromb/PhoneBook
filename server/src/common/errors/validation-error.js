const DefaultError = require('./default-error');
const HttpStatus = require('http-status');

class ValidationError extends DefaultError {
    /**
     * @constructor
     * @param {ValidationResult} validationResult validation result
     */
    constructor (validationResult) {
        super('Validation error', HttpStatus.BAD_REQUEST);
        this.valid = validationResult.getValid();
        this.errors = validationResult.getErrors();
    }
    getValid () {
        return this.valid;
    }
    getErrors () {
        return this.errors;
    }
}
module.exports = ValidationError;
