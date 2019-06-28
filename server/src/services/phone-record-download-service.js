const Excel = require('exceljs');

const CsvFields = [
    {header: 'First name', key: 'fname', width: 30},
    {header: 'Last name', key: 'lname', width: 30},
    {header: 'Phone number', key: 'phonenumber', width: 30}
];

class PhoneRecordDownloadService {
    constructor ({services}) {
        this.recordService = services.phonerecord;
    }
    static createCSVWorkBook (records) {
        const wb = new Excel.Workbook();
        const ws = wb.addWorksheet('PhoneBook');
        ws.columns = CsvFields;
        ws.addRows(records);

        return wb;
    }

    async downloadPhoneRecords ({page, limit, response}) {
        const records = (await this.recordService.getRecordList({page, limit})).rows;
        const wb = PhoneRecordDownloadService.createCSVWorkBook(records, response);
        response.writeHead(200, {
            'Content-Disposition': 'attachment; filename="file.csv"',
            'Content-Type': 'text/csv'
        });
        return wb.csv.write(response, {sheetName: 'PhoneBook'});
    }
}

module.exports = PhoneRecordDownloadService;
