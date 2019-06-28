const prepare = require('mocha-prepare');

/**
 * Prepares
 * @param done
 */
function onPrepare (done) {
    process.once('serverinitialized', function (arg) {
        done();
    });
}

/**
 * Un prepares
 * @param done
 */
function onUnprepare (done) {
    // eslint-disable-next-line no-process-exit
    process.exit(0);
    // eslint-disable-next-line
    done();
}

process.env.NODE_ENV = 'test';
prepare(onPrepare, onUnprepare);
require('../../server');
