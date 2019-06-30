const utils = require('./../utils/utils');
const contactUtils = require('../utils/contact-utils');
const httpStatus = require('http-status');
const expect = require('chai').expect;
const contactsInFile = 4;
describe('contacts uploading', () => {
    before('reset database', async () => {
        await utils.resetDatabase();
    });
    it('should upload file', async () => {
        await contactUtils.upload();
    });
    it('should update phone number on several uploads', async () => {
        await contactUtils.upload();
        const contacts = await contactUtils.getContactList();
        expect(contacts).to.have.lengthOf(contactsInFile);
        const jolyContact = contacts.find(r => r.lname === 'Joly');
        await contactUtils.upload({updated: true});
        const contactsUpdated = await contactUtils.getContactList();
        expect(contactsUpdated).to.have.lengthOf(contactsInFile);
        const jolyContactUpdated = contactsUpdated.find(r => r.lname === 'Joly');
        expect(jolyContact.phonenumber).to.be.not.equal(jolyContactUpdated.phonenumber);
    });
    it('should fail on uploading incorrect file', async () => {
        await contactUtils.upload({incorrect: true, errorCode: httpStatus.BAD_REQUEST});
    });
});
