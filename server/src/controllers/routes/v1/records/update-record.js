const asyncWrapper = require('../../../utils/async-wrapper');
module.exports = services => {
    const {phonerecord: recordService} = services;
    return asyncWrapper(async (req, res) => {
        const id = +req.params.id;
        const {fname, lname, phonenumber} = req.body;
        const user = await recordService.updateRecord(id, {fname, lname, phonenumber});
        res.json(user);
    });
};
