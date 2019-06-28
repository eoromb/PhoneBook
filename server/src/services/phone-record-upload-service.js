const Excel = require('exceljs');
const {Readable} = require('stream');

const CsvFields = [
    {name: 'fname', index: 1},
    {name: 'lname', index: 2},
    {name: 'phonenumber', index: 3}
];

class PhoneRecordUploadService {
    constructor ({services}) {
        this.recordService = services.phonerecord;
    }

    static createRecordFromCSVRow (row) {
        const record = {};
        CsvFields.forEach(f => {
            record[f.name] = row.getCell(f.index).value;
        });
        return record;
    }

    async uploadPhoneRecord ({file: {buffer}}) {
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
        const records = [];
        worksheet.eachRow({includeEmpty: false}, function (row, rowNumber) {
            if (rowNumber > 1) {
                records.push(PhoneRecordUploadService.createRecordFromCSVRow(row));
            }
        });
        return this.recordService.addOrUpdateRecordsByName({records});
    }
}

module.exports = PhoneRecordUploadService;

