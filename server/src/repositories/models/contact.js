/**
 * Contact model
 */
class Contact {
    constructor (id, fname, lname, phoneNumber) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.phonenumber = phoneNumber;
    }
    getId () {
        return this.id;
    }
    getFName () {
        return this.fname;
    }
    getLName () {
        return this.lname;
    }
    getPhoneNumber () {
        return this.phonenumber;
    }
}
module.exports = Contact;
