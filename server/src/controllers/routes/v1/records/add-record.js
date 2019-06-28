const asyncWrapper = require('../../../utils/async-wrapper');
const HttpStatus = require('http-status');
module.exports = services => {
    const {phonerecord: recordService} = services;
    return asyncWrapper(async (req, res) => {
        const {fname, lname, phonenumber} = req.body;
        const user = await recordService.addRecord({fname, lname, phonenumber});
        res.status(HttpStatus.OK);
        res.json(user);
    });
};
