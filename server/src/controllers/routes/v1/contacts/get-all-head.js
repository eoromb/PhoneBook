const asyncWrapper = require('../../../utils/async-wrapper');

module.exports = services => {
    const {contact: contactService} = services;
    return asyncWrapper(async (req, res) => {
        const {filter} = req.query;
        const {total} = await contactService.getContactList({page: 1, limit: 1, filter});
        res.setHeader('x-total-count', total);
        res.sendStatus(200);
    });
};
