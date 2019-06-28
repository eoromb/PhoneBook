const asyncWrapper = require('../../../utils/async-wrapper');
module.exports = services => {
    const {upload: uploadService} = services;
    return asyncWrapper(async (req, res) => {
        const {file} = req;
        const result = await uploadService.uploadPhoneRecord({file});
        res.json(result);
    });
};
