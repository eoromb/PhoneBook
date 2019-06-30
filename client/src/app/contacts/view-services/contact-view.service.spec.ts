// import { of } from 'rxjs';
// import { Contact } from '../models/contact.model';
// import { ContactsViewService } from './contacts-view.service';

// /**
//  * Contacts view service test
//  */
// describe('ContactViewService', () => {
//     let viewService: ContactsViewService;
//     const page = 1;
//     const limit = 20;
//     const filter = 'a';
//     const contact: Contact = { id: 1, fname: 'Anna', lname: 'Petrovich', phonenumber: '12345678901' } as Contact;
//     const contacts: Contact[] = [contact];
//     let dataService;
//     let notificationService;

//     beforeEach(() => {
//         // dataService = jasmine.createSpyObj('ContactsDataService', {
//         //     getContacts: of(contacts),
//         //     addContact: of(contact)
//         // });
//         dataService = jasmine.createSpyObj('ContactsDataService', ['getContacts']);
//         notificationService = jasmine.createSpyObj('NotificationService', ['showError']);
//         viewService = new ContactsViewService(dataService, notificationService);
//     });

//     it('should be created', () => {
//         expect(viewService).toBeTruthy();
//     });
//     // it('should call data service get contact on get contacts', () => {
//     //     viewService.getContacts(page, limit);
//     //     expect(dataService.getContact).toHaveBeenCalledTimes(1);
//     // });
// });
