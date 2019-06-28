const express = require('express');
const cors = require('cors');
const config = require('./config');
const packageJson = require('./package');
const bodyParser = require('body-parser');
// const accessLogger = require('./src/common/logging/accesslogger')();
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
app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));
//app.use(accessLogger);
setupRoutes(app, services);

const port = process.env.PORT || config['port'] || 3000;

process.on('uncaughtException', function (err) {
    const msg = 'Unhandled exception: ' + err.stack;
    console.log(msg);
    throw err;
});

app.disable('etag').disable('x-powered-by');
app.enable('trust proxy');
// all environments
app.set('port', port);

// Run server
const server = app.listen(port, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`${Date(Date.now())}: Node server version '${config.version}' started on ${host}:${port} ...`);
    process.emit('serverinitialized');
});
