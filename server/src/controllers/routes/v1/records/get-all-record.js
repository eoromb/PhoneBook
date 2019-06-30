const asyncWrapper = require('../../../utils/async-wrapper');

module.exports = services => {
    const {phonerecord: recordService} = services;
    return asyncWrapper(async (req, res) => {
        const {page, limit, filter} = req.query;
        const {rows, total} = await recordService.getRecordList({page, limit, filter});
        res.setHeader('x-total-count', total);
        res.json(rows);
    });
};
