const utils = require('./../utils/utils');
const recordUtils = require('../utils/phone-record-utils');
const httpStatus = require('http-status');
const expect = require('chai').expect;
const recordsInFile = 4;
describe('phone record basic operations', () => {
    before('reset database', async () => {
        await utils.resetDatabase();
    });
    it('should upload file', async () => {
        await recordUtils.upload();
    });
    it('should update phone number on several uploads', async () => {
        await recordUtils.upload();
        const records = await recordUtils.getRecordList();
        expect(records).to.have.lengthOf(recordsInFile);
        const jolyRecord = records.find(r => r.lname === 'Joly');
        await recordUtils.upload({updated: true});
        const recordsUpdated = await recordUtils.getRecordList();
        expect(recordsUpdated).to.have.lengthOf(recordsInFile);
        const jolyRecordUpdated = recordsUpdated.find(r => r.lname === 'Joly');
        expect(jolyRecord.phonenumber).to.be.not.equal(jolyRecordUpdated.phonenumber);
    });
    it('should fail on uploading incorrect file', async () => {
        await recordUtils.upload({incorrect: true, errorCode: httpStatus.BAD_REQUEST});
    });
});
