const utils = require('./../utils/utils');
const recordUtils = require('../utils/phone-record-utils');
const dataForTest = require('../data/data-for-test');
const httpStatus = require('http-status');
const expect = require('chai').expect;
let recordInd = 0;
describe('phone record basic operations', () => {
    before('reset database', async () => {
        await utils.resetDatabase();
    });
    describe('add/get/delete', () => {
        it('should add/delete phone record', async () => {
            const recordDesc = dataForTest.getRecord({index: recordInd++});
            const record = await recordUtils.addRecord({...recordDesc});
            expect(record.fname).to.be.equal(recordDesc.fname);
            expect(record.lname).to.be.equal(recordDesc.lname);
            expect(record.phonenumber).to.be.equal(recordDesc.phonenumber);
            await recordUtils.deleteRecord({record});
        });
        it('should delete record', async () => {
            const recordDesc = dataForTest.getRecord({index: recordInd++});
            const record = await recordUtils.addRecord({...recordDesc});
            await recordUtils.deleteRecord({record});
            await recordUtils.getRecord({record, errorCode: httpStatus.NOT_FOUND});
        });
        it('should get record', async () => {
            const recordDesc = dataForTest.getRecord({index: recordInd++});
            const record = await recordUtils.addRecord({...recordDesc});
            const getRecord = await recordUtils.getRecord({record});
            expect(getRecord).to.deep.equal(record);
            await recordUtils.deleteRecord({record});
        });
        it('should get not found error if id absent', async () => {
            await recordUtils.getRecord({record: {id: 555}, errorCode: httpStatus.NOT_FOUND});
        });
    });
    describe('filtering', () => {
        let records;
        beforeEach(async () => {
            records = [];
            records.push(await recordUtils.addRecord({...dataForTest.getRecord({index: recordInd++, fname: 'John'})}));
            records.push(await recordUtils.addRecord({...dataForTest.getRecord({index: recordInd++, lname: 'Bill'})}));
            records.push(await recordUtils.addRecord({...dataForTest.getRecord({index: recordInd++, fname: 'Jillany'})}));
        });
        afterEach(async () => {
            for (const record of records) {
                await recordUtils.deleteRecord({record});
            }
        });
        it('should get filtered by fname', async () => {
            const {results, total} = await recordUtils.getRecordListPaginated({filter: 'john'});
            expect(results).to.have.lengthOf(1);
            expect(results[0].id).to.be.equal(records[0].id);
            expect(total).to.be.equal(1);
        });
        it('should get filtered by lname', async () => {
            const {results, total} = await recordUtils.getRecordListPaginated({filter: 'bill'});
            expect(results).to.have.lengthOf(1);
            expect(results[0].id).to.be.equal(records[1].id);
            expect(total).to.be.equal(1);
        });
        it('should get filter by part of string', async () => {
            const {results, total} = await recordUtils.getRecordListPaginated({filter: 'ill'});
            expect(results).to.have.lengthOf(2);
            expect(results[0].id).to.be.equal(records[1].id);
            expect(results[1].id).to.be.equal(records[2].id);
            expect(total).to.be.equal(2);
        });
    });
    describe('validation', () => {
        let record;
        before(async () => {
            const recordDesc = dataForTest.getRecord({index: recordInd++});
            record = await recordUtils.addRecord({...recordDesc});
        });
        after(async () => {
            await recordUtils.deleteRecord({record});
        });
        describe('adding', () => {
            it('should not allowed phone record with the same full name', async () => {
                await recordUtils.addRecord({...record, errorCode: httpStatus.BAD_REQUEST});
            });
            it('should have case insensitive full name', async () => {
                await recordUtils.addRecord({
                    fname: record.fname.toUpperCase(), lname: record.lname.toUpperCase(), phonenumber: record.phonenumber,
                    errorCode: httpStatus.BAD_REQUEST
                });
            });
            it('should not allowed without fname', async () => {
                const recordDesc = dataForTest.getRecord({index: recordInd++});
                await recordUtils.addRecord(({...recordDesc, fname: undefined, errorCode: httpStatus.BAD_REQUEST}));
            });
            it('should not allowed null fname', async () => {
                const recordDesc = dataForTest.getRecord({index: recordInd++, fname: null});
                await recordUtils.addRecord(({...recordDesc, errorCode: httpStatus.BAD_REQUEST}));
            });
            it('should not allowed empty for fname', async () => {
                const recordDesc = dataForTest.getRecord({index: recordInd++, fname: ''});
                await recordUtils.addRecord(({...recordDesc, errorCode: httpStatus.BAD_REQUEST}));
            });
            it('should not allowed without lname', async () => {
                const recordDesc = dataForTest.getRecord({index: recordInd++});
                await recordUtils.addRecord(({...recordDesc, lname: undefined, errorCode: httpStatus.BAD_REQUEST}));
            });
            it('should not allowed null lname', async () => {
                const recordDesc = dataForTest.getRecord({index: recordInd++, lname: null});
                await recordUtils.addRecord(({...recordDesc, errorCode: httpStatus.BAD_REQUEST}));
            });
            it('should not allowed empty for lname', async () => {
                const recordDesc = dataForTest.getRecord({index: recordInd++, lname: ''});
                await recordUtils.addRecord(({...recordDesc, errorCode: httpStatus.BAD_REQUEST}));
            });
            it('should not allowed without phonenumber', async () => {
                const recordDesc = dataForTest.getRecord({index: recordInd++});
                await recordUtils.addRecord(({...recordDesc, phonenumber: undefined, errorCode: httpStatus.BAD_REQUEST}));
            });
            it('should not allowed unsupported phones formats (supported is x-xxx-xxx-xxxx or xxxxxxxxxxx)', async () => {
                const recordDesc = dataForTest.getRecord({index: recordInd++, phonenumber: '12345'});
                await recordUtils.addRecord(({...recordDesc, errorCode: httpStatus.BAD_REQUEST}));
                const record = await recordUtils.addRecord(({...recordDesc, phonenumber: '7-111-111-1111'}));
                await recordUtils.deleteRecord({record});
            });
        });
        describe('updating', async () => {
            it('should not update record name if such name already exists', async () => {
                const recordDesc = dataForTest.getRecord({index: recordInd++});
                const recordToUpdate = await recordUtils.addRecord(({...recordDesc}));
                await recordUtils.updateRecord({record: recordToUpdate, body: record, errorCode: httpStatus.BAD_REQUEST});
                await recordUtils.deleteRecord({record: recordToUpdate});
            });
        });
    });
    describe('update', () => {
        it('should update phone record', async () => {
            const recordDesc = dataForTest.getRecord({index: recordInd++});
            const recordDescUpdated = dataForTest.getRecord({index: recordInd++});
            let record = await recordUtils.addRecord({...recordDesc});
            record = await recordUtils.updateRecord({record, body: recordDescUpdated});
            expect(record.fname).to.be.equal(recordDescUpdated.fname);
            expect(record.lname).to.be.equal(recordDescUpdated.lname);
            expect(record.phonenumber).to.be.equal(recordDescUpdated.phonenumber);
            await recordUtils.deleteRecord({record});
        });
        it('should update only phone number', async () => {
            const recordDesc = dataForTest.getRecord({index: recordInd++});
            const phoneNumberUpdated = '71111112222';
            let record = await recordUtils.addRecord({...recordDesc});
            record = await recordUtils.updateRecord({record, body: {phonenumber: phoneNumberUpdated}});
            expect(record.phonenumber).to.be.equal(phoneNumberUpdated);
            await recordUtils.deleteRecord({record});
        });
    });
    describe('list', () => {
        let records;
        let recordByIdMap;
        beforeEach(async () => {
            const recordDescs = [dataForTest.getRecord({index: recordInd++}), dataForTest.getRecord({index: recordInd++})];
            records = [];
            records.push(await recordUtils.addRecord({...recordDescs[0]}));
            records.push(await recordUtils.addRecord({...recordDescs[1]}));
            recordByIdMap = new Map();
            records.forEach(r => (recordByIdMap[r.id] = r));
        });
        afterEach(async () => {
            for (const record of records) {
                await recordUtils.deleteRecord({record});
            }
        });
        it('should get records full list', async () => {
            const resultRecords = await recordUtils.getRecordList();
            expect(resultRecords).to.have.lengthOf(records.length);
            resultRecords.forEach(r => expect(r).to.deep.equal(recordByIdMap[r.id]));
        });
        it('should get paginated record list', async () => {
            const {results, total} = await recordUtils.getRecordListPaginated({page: 1, limit: 1});
            expect(results).to.have.lengthOf(1);
            expect(total).to.be.equal(records.length);
        });
    });
});
