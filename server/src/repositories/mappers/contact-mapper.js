const Contact = require('../models/contact');
/**
 * Maps contact model from/to datatbase entity
 */
class ContactMapper {
    checkContactEntity (entity) {
        if (entity == null) {
            throw new Error('Contact entity is null');
        }
        const {id, fname, lname, phonenumber} = entity;
        if (id == null) {
            throw new Error('Contact id is null');
        }
        if (fname == null) {
            throw new Error('Contact first name is null');
        }
        if (lname == null) {
            throw new Error('Contact last name is null');
        }
        if (phonenumber == null) {
            throw new Error('Contact number is null');
        }
    }
    createContactFromDbEntity (entity) {
        this.checkContactEntity(entity);
        return new Contact(entity.id, entity.fname, entity.lname, entity.phonenumber);
    }
    createcontactsFromDbEntities (entities) {
        if (!Array.isArray(entities)) {
            throw new Error('Contact entiies is not array');
        }
        const contacts = [];
        entities.forEach(e => contacts.push(this.createContactFromDbEntity(e)));
    }
}
module.exports = ContactMapper;
