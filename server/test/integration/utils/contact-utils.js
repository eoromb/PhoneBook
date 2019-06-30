const request = require('request-promise');
const expect = require('chai').expect;
const utils = require('./utils');
const fs = require('fs');
module.exports = {
    checkContact: contact => {
        expect(contact).to.have.property('id');
        expect(contact).to.have.property('fname');
        expect(contact).to.have.property('lname');
        expect(contact).to.have.property('phonenumber');
    },
    options: {
        baseUrl: 'http://localhost:3000/api/v1/contacts',
        checkFn: contact => module.exports.checkContact(contact),
        fileName: 'test/integration/data/file.csv',
        fileUpdateName: 'test/integration/data/file_updated.csv',
        fileIncorrectName: 'test/integration/data/file_incorrect.csv'
    },
    getContactListPaginated: async ({page, limit, filter, errorCode}) => module.exports.getContactList({
        options: {queryParams: {page, limit, filter}, getFullResponse: true}, errorCode
    }),
    getContactList: async ({options, errorCode} = {}) => utils.getList({...module.exports.options, ...options}, errorCode),
    addContact: async ({fname, lname, phonenumber, errorCode}) => utils.add({
        fname,
        lname,
        phonenumber
    }, module.exports.options, errorCode),
    getContact: async ({contact, errorCode}) => utils.get(contact, module.exports.options, errorCode),
    deleteContact: async ({contact, errorCode}) => utils.delete(contact, module.exports.options, errorCode),
    updateContact: async ({contact, body, errorCode}) => utils.update(contact, body, module.exports.options, errorCode),
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
