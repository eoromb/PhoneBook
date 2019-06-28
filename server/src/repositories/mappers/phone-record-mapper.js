const PhoneRecord = require('../models/phone-record');
class PhoneRecordMapper {
    checkPhoneRecordEntity (entity) {
        if (entity == null) {
            throw new Error('Phone record entity is null');
        }
        const {id, fname, lname, phonenumber} = entity;
        if (id == null) {
            throw new Error('Phone record id is null');
        }
        if (fname == null) {
            throw new Error('Phone first name is null');
        }
        if (lname == null) {
            throw new Error('Phone last name is null');
        }
        if (phonenumber == null) {
            throw new Error('Phone number is null');
        }
    }
    createPhoneRecordFromDbEntity (entity) {
        this.checkPhoneRecordEntity(entity);
        return new PhoneRecord(entity.id, entity.fname, entity.lname, entity.phonenumber);
    }
    createPhoneRecordsFromDbEntities (entities) {
        if (!Array.isArray(entities)) {
            throw new Error('Phone record entiies is not array');
        }
        const records = [];
        entities.forEach(e => records.push(this.createPhoneRecordFromDbEntity(e)));
    }
}
module.exports = PhoneRecordMapper;
