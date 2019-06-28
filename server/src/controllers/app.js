const express = require('express');
const routesV1 = require('./routes/v1');
const testUtilsRoutes = require('./routes/test-utils');

module.exports = (app, services) => {
    app = app || express();
    app.use('/api/v1', routesV1.create(app, services));
    app.use('/testutils', testUtilsRoutes.create(app, services));
    app.use('/api/v1/testutils', testUtilsRoutes.create(app, services));

    return app;
};
