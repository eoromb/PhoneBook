const asyncWrapper = require('../../../utils/async-wrapper');
module.exports = services => {
    const {phonerecord: recordService} = services;
    return asyncWrapper(async (req, res) => {
        const id = +req.params.id;
        const record = await recordService.getRecord(id);
        res.json(record);
    });
};
