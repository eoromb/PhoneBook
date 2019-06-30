const asyncWrapper = require('../../../utils/async-wrapper');
module.exports = services => {
    const {contact: contactService} = services;
    return asyncWrapper(async (req, res) => {
        const id = +req.params.id;
        const contact = await contactService.getContact(id);
        res.json(contact);
    });
};
