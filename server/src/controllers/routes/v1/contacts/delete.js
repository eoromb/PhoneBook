const asyncWrapper = require('../../../utils/async-wrapper');
module.exports = services => {
    const {contact: contactService} = services;
    return asyncWrapper(async (req, res) => {
        const id = +req.params.id;
        await contactService.deleteContact(id);
        res.json({});
    });
};
