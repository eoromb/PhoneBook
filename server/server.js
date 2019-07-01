const express = require('express');
const cors = require('cors');
const config = require('./config');
const packageJson = require('./package');
const bodyParser = require('body-parser');
const logger = require('./src/common/logging/log')();
const ConfigService = require('./src/common/services/config-service');
const LogService = require('./src/common/services/log-service');
const configService = new ConfigService(config);
const logService = new LogService(logger);

const repositories = require('./src/repositories')(configService);
const validators = require('./src/validators')({repositories});
const services = require('./src/services')({repositories, validators, configService, logService});
const setupRoutes = require('./src/controllers/app');

config.version = packageJson.version;

const app = express();
app.use(cors({exposedHeaders: ['x-total-count']}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
setupRoutes(app, services);

const port = process.env.PORT || config['port'] || 3000;

process.on('uncaughtException', function (err) {
    const msg = 'Unhandled exception: ' + err.stack;
    console.log(msg);
    throw err;
});

app.set('port', port);

const server = app.listen(port, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`${Date(Date.now())}: Node server version '${config.version}' started on ${host}:${port} ...`);
    process.emit('serverinitialized');
});
