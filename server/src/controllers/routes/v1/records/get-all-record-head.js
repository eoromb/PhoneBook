const asyncWrapper = require('../../../utils/async-wrapper');

module.exports = services => {
    const {phonerecord: recordService} = services;
    return asyncWrapper(async (req, res) => {
        const {total} = await recordService.getRecordList({page: 1, limit: 1});
        res.setHeader('x-total-count', total);
        res.sendStatus(200);
    });
};
