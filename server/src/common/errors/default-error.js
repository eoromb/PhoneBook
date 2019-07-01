/**
 * Default application error
 */
class DefaultError extends Error {
    constructor (message, code) {
        super();
        this.message = message || '';
        this.code = code || 500;
    }
    getMessage () {
        return this.message;
    }
    getCode () {
        return this.code;
    }
}
module.exports = DefaultError;
