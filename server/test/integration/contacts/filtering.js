const utils = require('../utils/utils');
const contactUtils = require('../utils/contact-utils');
const dataForTest = require('../data/data-for-test');
const expect = require('chai').expect;
let contactInd = 0;
describe('contacts filtering', () => {
    let contacts;
    before('reset database', async () => {
        await utils.resetDatabase();
    });
    beforeEach(async () => {
        contacts = [];
        contacts.push(await contactUtils.addContact({...dataForTest.getContact({index: contactInd++, fname: 'John'})}));
        contacts.push(await contactUtils.addContact({...dataForTest.getContact({index: contactInd++, lname: 'Bill'})}));
        contacts.push(await contactUtils.addContact({...dataForTest.getContact({index: contactInd++, fname: 'Jillany'})}));
    });
    afterEach(async () => {
        for (const contact of contacts) {
            await contactUtils.deleteContact({contact});
        }
    });
    it('should get filtered by fname', async () => {
        const {results, total} = await contactUtils.getContactListPaginated({filter: 'john'});
        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.be.equal(contacts[0].id);
        expect(total).to.be.equal(1);
    });
    it('should get filtered by lname', async () => {
        const {results, total} = await contactUtils.getContactListPaginated({filter: 'bill'});
        expect(results).to.have.lengthOf(1);
        expect(results[0].id).to.be.equal(contacts[1].id);
        expect(total).to.be.equal(1);
    });
    it('should get filter by part of string', async () => {
        const {results, total} = await contactUtils.getContactListPaginated({filter: 'ill'});
        expect(results).to.have.lengthOf(2);
        expect(results[0].id).to.be.equal(contacts[1].id);
        expect(results[1].id).to.be.equal(contacts[2].id);
        expect(total).to.be.equal(2);
    });
});
