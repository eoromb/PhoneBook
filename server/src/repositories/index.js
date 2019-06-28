const PhoneRecordRepository = require('./phone-record-repository');
const DbHelper = require('./utils/db-helper');
const PhoneRecordMapper = require('./mappers/phone-record-mapper');
const TestRepository = require('./test-repository');
const pgp = require('pg-promise')();

const initializeDatabase = function (dbConfig) {
    return pgp(dbConfig);
};
module.exports = configService => {
    const dbConfig = configService.getDatabaseConfig();
    const repositories = {};
    const db = initializeDatabase(dbConfig);
    const dbHelper = new DbHelper(db, pgp);
    const recordMapper = new PhoneRecordMapper();

    repositories.phonerecord = new PhoneRecordRepository(recordMapper, dbHelper);
    repositories.test = new TestRepository(db, pgp);

    return repositories;
};

