const request = require('request-promise');
const expect = require('chai').expect;
const path = require('path');
const utils = require('./utils');
const fs = require('fs');
module.exports = {
    checkRecord: record => {
        expect(record).to.have.property('id');
        expect(record).to.have.property('fname');
        expect(record).to.have.property('lname');
        expect(record).to.have.property('phonenumber');
    },
    options: {
        baseUrl: 'http://localhost:3000/api/v1/records',
        checkFn: record => module.exports.checkRecord(record),
        fileName: 'test/integration/data/file.csv',
        fileUpdateName: 'test/integration/data/file_updated.csv',
        fileIncorrectName: 'test/integration/data/file_incorrect.csv'
    },
    getRecordListPaginated: async ({page, limit, errorCode}) => module.exports.getRecordList({options: {queryParams: {page, limit}, getFullResponse: true}, errorCode}),
    getRecordList: async ({options, errorCode} = {}) => utils.getList({...module.exports.options, ...options}, errorCode),
    addRecord: async ({fname, lname, phonenumber, errorCode}) => utils.add({
        fname,
        lname,
        phonenumber
    }, module.exports.options, errorCode),
    getRecord: async ({record, errorCode}) => utils.get(record, module.exports.options, errorCode),
    deleteRecord: async ({record, errorCode}) => utils.delete(record, module.exports.options, errorCode),
    updateRecord: async ({record, body, errorCode}) => utils.update(record, body, module.exports.options, errorCode),
    upload: async ({updated = false, incorrect = false, errorCode} = {}) => {
        const {baseUrl, fileName, fileUpdateName, fileIncorrectName} = module.exports.options;
        let file = fileName;
        file = updated ? fileUpdateName : (incorrect ? fileIncorrectName : file);

        const options = {
            method: 'POST',
            uri: `${baseUrl}/upload`,
            formData: {
                file: fs.createReadStream(file)
            },
            json: true
        };
        try {
            const result = await request(options);
            expect(result).to.have.property('inserted');
            return result;
        } catch (error) {
            expect(errorCode).to.exist;
            expect(error.statusCode).to.be.equal(errorCode);
        }
    }
};
