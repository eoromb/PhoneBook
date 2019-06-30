const ContactRepository = require('./contact-repository');
const DbHelper = require('./utils/db-helper');
const ContactMapper = require('./mappers/contact-mapper');
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
    const contactMapper = new ContactMapper();

    repositories.contact = new ContactRepository(contactMapper, dbHelper);
    repositories.test = new TestRepository(db, pgp);

    return repositories;
};

