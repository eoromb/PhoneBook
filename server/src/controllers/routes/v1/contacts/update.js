const asyncWrapper = require('../../../utils/async-wrapper');
module.exports = services => {
    const {contact: contactService} = services;
    return asyncWrapper(async (req, res) => {
        const id = +req.params.id;
        const {fname, lname, phonenumber} = req.body;
        const user = await contactService.updateContact(id, {fname, lname, phonenumber});
        res.json(user);
    });
};
