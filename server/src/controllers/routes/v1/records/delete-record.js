const asyncWrapper = require('../../../utils/async-wrapper');
module.exports = services => {
    const {phonerecord: recordService} = services;
    return asyncWrapper(async (req, res) => {
        const id = +req.params.id;
        await recordService.deleteRecord(id);
        res.json({});
    });
};
