const Excel = require('exceljs');

const CsvFields = [
    {header: 'First name', key: 'fname', width: 30},
    {header: 'Last name', key: 'lname', width: 30},
    {header: 'Phone number', key: 'phonenumber', width: 30}
];

/**
 * Service for contacts downloading
 */
class ContactDownloadService {
    constructor ({services}) {
        this.contactService = services.contact;
    }
    static createCSVWorkBook (contacts) {
        const wb = new Excel.Workbook();
        const ws = wb.addWorksheet('PhoneBook');
        ws.columns = CsvFields;
        ws.addRows(contacts);

        return wb;
    }

    /**
     * Downloads contacts in CSV file
     */
    async downloadContacts ({page, limit, response}) {
        const contacts = (await this.contactService.getContactList({page, limit})).rows;
        const wb = ContactDownloadService.createCSVWorkBook(contacts, response);
        response.writeHead(200, {
            'Content-Disposition': 'attachment; filename="file.csv"',
            'Content-Type': 'text/csv'
        });
        return wb.csv.write(response, {sheetName: 'PhoneBook'});
    }
}

module.exports = ContactDownloadService;
