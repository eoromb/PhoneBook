const utils = require('../utils/utils');
const contactUtils = require('../utils/contact-utils');
const dataForTest = require('../data/data-for-test');
const httpStatus = require('http-status');
let contactInd = 0;
describe('contacts validation', () => {
    let contact;
    before('reset database', async () => {
        await utils.resetDatabase();
    });
    before(async () => {
        const contactDesc = dataForTest.getContact({index: contactInd++});
        contact = await contactUtils.addContact({...contactDesc});
    });
    after(async () => {
        await contactUtils.deleteContact({contact});
    });
    describe('adding', () => {
        it('should not allowed contact with the same full name', async () => {
            await contactUtils.addContact({...contact, errorCode: httpStatus.BAD_REQUEST});
        });
        it('should have case insensitive full name', async () => {
            await contactUtils.addContact({
                fname: contact.fname.toUpperCase(), lname: contact.lname.toUpperCase(), phonenumber: contact.phonenumber,
                errorCode: httpStatus.BAD_REQUEST
            });
        });
        it('should not allowed without fname', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++});
            await contactUtils.addContact(({...contactDesc, fname: undefined, errorCode: httpStatus.BAD_REQUEST}));
        });
        it('should not allowed null fname', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++, fname: null});
            await contactUtils.addContact(({...contactDesc, errorCode: httpStatus.BAD_REQUEST}));
        });
        it('should not allowed empty for fname', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++, fname: ''});
            await contactUtils.addContact(({...contactDesc, errorCode: httpStatus.BAD_REQUEST}));
        });
        it('should not allowed without lname', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++});
            await contactUtils.addContact(({...contactDesc, lname: undefined, errorCode: httpStatus.BAD_REQUEST}));
        });
        it('should not allowed null lname', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++, lname: null});
            await contactUtils.addContact(({...contactDesc, errorCode: httpStatus.BAD_REQUEST}));
        });
        it('should not allowed empty for lname', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++, lname: ''});
            await contactUtils.addContact(({...contactDesc, errorCode: httpStatus.BAD_REQUEST}));
        });
        it('should not allowed without phonenumber', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++});
            await contactUtils.addContact(({...contactDesc, phonenumber: undefined, errorCode: httpStatus.BAD_REQUEST}));
        });
        it('should not allowed unsupported phones formats (supported is x-xxx-xxx-xxxx or xxxxxxxxxxx)', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++, phonenumber: '12345'});
            await contactUtils.addContact(({...contactDesc, errorCode: httpStatus.BAD_REQUEST}));
            const contact = await contactUtils.addContact(({...contactDesc, phonenumber: '7-111-111-1111'}));
            await contactUtils.deleteContact({contact});
        });
    });
    describe('updating', async () => {
        it('should not update contact name if such name already exists', async () => {
            const contactDesc = dataForTest.getContact({index: contactInd++});
            const contactToUpdate = await contactUtils.addContact(({...contactDesc}));
            await contactUtils.updateContact({contact: contactToUpdate, body: contact, errorCode: httpStatus.BAD_REQUEST});
            await contactUtils.deleteContact({contact: contactToUpdate});
        });
    });
});
