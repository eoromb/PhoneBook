const logger = require('morgan');
const path = require('path');
const fs = require('fs');
const rfs = require('rotating-file-stream');

function getAccessLogger (format, file) {
    if (format == null || format === '') {
        format = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ":referrer" ":user-agent"';
    }
    let logDir;
    if (file === undefined) {
        logDir = path.join(__dirname, '../../../logfiles');
        file = 'access.log';
    } else {
        logDir = path.dirname(file);
        file = path.basename(file);
    }

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }
    // create a rotating write stream
    const httpLogStream = rfs(file, {
        interval: '1d',
        path: logDir
    });
    return logger(format, {stream: httpLogStream});
}

module.exports = getAccessLogger;

