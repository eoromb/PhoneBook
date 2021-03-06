const asyncWrapper = require('../../../utils/async-wrapper');
module.exports = services => {
    const {download: downloadService} = services;
    return asyncWrapper(async (req, res) => {
        const {page, limit} = req.query;

        await downloadService.downloadContacts({page, limit, response: res});
    });
};
