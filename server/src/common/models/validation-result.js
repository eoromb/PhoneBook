class ValidationResult {
    constructor () {
        this.errors = [];
    }
    addError (error) {
        this.errors.push(error);
    }
    getErrors () {
        return this.errors;
    }
    getValid () {
        return this.errors.length === 0;
    }
}
module.exports = ValidationResult;
