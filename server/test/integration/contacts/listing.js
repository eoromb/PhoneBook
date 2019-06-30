const utils = require('../utils/utils');
const contactUtils = require('../utils/contact-utils');
const dataForTest = require('../data/data-for-test');
const expect = require('chai').expect;
let contactInd = 0;
describe('contacts listing', () => {
    let contacts;
    let contactByIdMap;
    before('reset database', async () => {
        await utils.resetDatabase();
    });
    beforeEach(async () => {
        const contactDescs = [dataForTest.getContact({index: contactInd++}), dataForTest.getContact({index: contactInd++})];
        contacts = [];
        contacts.push(await contactUtils.addContact({...contactDescs[0]}));
        contacts.push(await contactUtils.addContact({...contactDescs[1]}));
        contactByIdMap = new Map();
        contacts.forEach(r => (contactByIdMap[r.id] = r));
    });
    afterEach(async () => {
        for (const contact of contacts) {
            await contactUtils.deleteContact({contact});
        }
    });
    it('should get contacts full list', async () => {
        const resultContacts = await contactUtils.getContactList();
        expect(resultContacts).to.have.lengthOf(contacts.length);
        resultContacts.forEach(r => expect(r).to.deep.equal(contactByIdMap[r.id]));
    });
    it('should get paginated contact list', async () => {
        const {results, total} = await contactUtils.getContactListPaginated({page: 1, limit: 1});
        expect(results).to.have.lengthOf(1);
        expect(total).to.be.equal(contacts.length);
    });
});
