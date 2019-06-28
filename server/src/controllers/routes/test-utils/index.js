const express = require('express');
const asyncWrapper = require('../../utils/async-wrapper');

module.exports.create = (app, services) => {
    const router = express.Router();
    router.post('/resetdatabase', asyncWrapper(async (req, res) => {
        const {test: testService} = services;
        await testService.resetDatabase();
        res.json({});
    }));
    return router;
};
