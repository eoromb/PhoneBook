const Excel = require('exceljs');
const {Readable} = require('stream');

const CsvFields = [
    {name: 'fname', index: 1},
    {name: 'lname', index: 2},
    {name: 'phonenumber', index: 3}
];

class ContactUploadService {
    constructor ({services}) {
        this.contactService = services.contact;
    }

    static createContactFromCSVRow (row) {
        const contact = {};
        CsvFields.forEach(f => {
            contact[f.name] = row.getCell(f.index).value;
        });
        return contact;
    }

    async uploadContact ({file: {buffer}}) {
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);
        const workbook = new Excel.Workbook();
        const options = {
            map (value, index) {
                return value;
            }
        };
        const worksheet = await workbook.csv.read(stream, options);
        const contacts = [];
        worksheet.eachRow({includeEmpty: false}, function (row, rowNumber) {
            if (rowNumber > 1) {
                contacts.push(ContactUploadService.createContactFromCSVRow(row));
            }
        });
        return this.contactService.addOrUpdateContactsByName({contacts});
    }
}

module.exports = ContactUploadService;

