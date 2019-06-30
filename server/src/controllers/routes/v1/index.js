const express = require('express');
const errorRoute = require('./error');
const contacts = require('./contacts');

module.exports.create = (app, services) => {
    const router = express.Router();
    router.use('/contacts', contacts.create(services));
    router.use(errorRoute(services));
    return router;
};
