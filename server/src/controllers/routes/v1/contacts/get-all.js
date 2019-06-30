const asyncWrapper = require('../../../utils/async-wrapper');

module.exports = services => {
    const {contact: contactService} = services;
    return asyncWrapper(async (req, res) => {
        const {page, limit, filter} = req.query;
        const {rows, total} = await contactService.getContactList({page, limit, filter});
        res.setHeader('x-total-count', total);
        res.json(rows);
    });
};
