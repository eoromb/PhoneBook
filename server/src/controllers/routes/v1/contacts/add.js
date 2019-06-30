const asyncWrapper = require('../../../utils/async-wrapper');
const HttpStatus = require('http-status');
module.exports = services => {
    const {contact: contactService} = services;
    return asyncWrapper(async (req, res) => {
        const {fname, lname, phonenumber} = req.body;
        const user = await contactService.addContact({fname, lname, phonenumber});
        res.status(HttpStatus.OK);
        res.json(user);
    });
};
