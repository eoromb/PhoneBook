const DefaultError = require('../../../common/errors/default-error');
const defaultError = new DefaultError('Internal server error', 500);
module.exports = function (services) {
    const logService = services.log;
    return (error, req, res, next) => {
        logService && logService.error(error ? error.toString() : defaultError.message);
        res.status(error instanceof DefaultError ? error.code : defaultError.code);
        res.json(error instanceof DefaultError ? error : defaultError);
    };
};
