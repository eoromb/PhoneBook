import { Contact } from '../models/contact.model';
import { ContactsViewService } from './contacts-view.service';
import { cold } from 'jasmine-marbles';
import { createPaginatedList, PaginatedList } from 'src/app/shared/models/paginated-list.model';
import { createPagination } from 'src/app/shared/models/pagination.model';
/**
 * Contacts view service test
 */
describe('ContactViewService', () => {
    let viewService: ContactsViewService;
    const page = 1;
    const limit = 20;
    const contact: Contact = { id: 1, fname: 'Anna', lname: 'Petrovich', phonenumber: '12345678901' } as Contact;
    const contacts: PaginatedList<Contact> = createPaginatedList([contact], createPagination(1, 1, 1));
    let dataService;
    let notificationService;

    beforeEach(() => {
        dataService = jasmine.createSpyObj('ContactsDataService', {
            getContacts: cold('a', { a: contacts })
        });
        notificationService = jasmine.createSpyObj('NotificationService', ['showError']);
        viewService = new ContactsViewService(dataService, notificationService);
    });

    it('should be created', () => {
        expect(viewService).toBeTruthy();
    });
    it('should set contacts on getContacts', () => {
        viewService.getContacts(page, limit);
        const expectedContacts = cold('a', { a: contacts });
        expect(viewService.contacts$).toBeObservable(expectedContacts);
    });
});
