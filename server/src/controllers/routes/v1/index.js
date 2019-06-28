const express = require('express');
const errorRoute = require('./error');
const records = require('./records');

module.exports.create = (app, services) => {
    const router = express.Router();
    router.use('/records', records.create(services));
    router.use(errorRoute(services));
    return router;
};
