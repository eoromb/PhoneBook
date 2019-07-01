const DefaultError = require('./default-error');
const HttpStatus = require('http-status');

/**
 * Not found error
 */
class NotFoundError extends DefaultError {
    constructor (message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}
module.exports = NotFoundError;
