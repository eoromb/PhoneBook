/**
 * Validation result model
 */
class ValidationResult {
    constructor () {
        this.errors = [];
    }
    /**
     * Adds validation error to model
     */
    addError (error) {
        this.errors.push(error);
    }
    /**
     * Gets errors
     */
    getErrors () {
        return this.errors;
    }
    /**
     * Get if result is valid
     */
    getValid () {
        return this.errors.length === 0;
    }
}
module.exports = ValidationResult;
