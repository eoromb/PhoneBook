const utils = require('../utils/utils');
const contactUtils = require('../utils/contact-utils');
const dataForTest = require('../data/data-for-test');
const httpStatus = require('http-status');
const expect = require('chai').expect;
let contactInd = 0;
describe('contacts basic operations', () => {
    before('reset database', async () => {
        await utils.resetDatabase();
    });
    describe('add/get/delete', () => {
        it('should add/delete contact', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++});
            const contact = await contactUtils.addContact({...contactDesc});
            expect(contact.fname).to.be.equal(contactDesc.fname);
            expect(contact.lname).to.be.equal(contactDesc.lname);
            expect(contact.phonenumber).to.be.equal(contactDesc.phonenumber);
            await contactUtils.deleteContact({contact});
        });
        it('should delete contact', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++});
            const contact = await contactUtils.addContact({...contactDesc});
            await contactUtils.deleteContact({contact});
            await contactUtils.getContact({contact, errorCode: httpStatus.NOT_FOUND});
        });
        it('should get contact', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++});
            const contact = await contactUtils.addContact({...contactDesc});
            const getContact = await contactUtils.getContact({contact});
            expect(getContact).to.deep.equal(contact);
            await contactUtils.deleteContact({contact});
        });
        it('should get not found error if id absent', async () => {
            await contactUtils.getContact({contact: {id: 555}, errorCode: httpStatus.NOT_FOUND});
        });
    });
    describe('update', () => {
        it('should update contact', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++});
            const contactDescUpdated = dataForTest.getContact({index: contactInd++});
            let contact = await contactUtils.addContact({...contactDesc});
            contact = await contactUtils.updateContact({contact, body: contactDescUpdated});
            expect(contact.fname).to.be.equal(contactDescUpdated.fname);
            expect(contact.lname).to.be.equal(contactDescUpdated.lname);
            expect(contact.phonenumber).to.be.equal(contactDescUpdated.phonenumber);
            await contactUtils.deleteContact({contact});
        });
        it('should update only phone number', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++});
            const phoneNumberUpdated = '71111112222';
            let contact = await contactUtils.addContact({...contactDesc});
            contact = await contactUtils.updateContact({contact, body: {phonenumber: phoneNumberUpdated}});
            expect(contact.phonenumber).to.be.equal(phoneNumberUpdated);
            await contactUtils.deleteContact({contact});
        });
    });
});
