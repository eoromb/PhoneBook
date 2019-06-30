import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { ConfigService } from 'src/app/core/services/config.service';
import { ContactsDataService } from './contacts-data.service';
import { Contact } from '../models/contact.model';

/**
 * Contacts data service test
 */
describe('ContactDataService', () => {
    let service: ContactsDataService;
    let configService: ConfigService;
    const page = 1;
    const limit = 20;
    const filter = 'a';
    const contactsUrl = 'url';
    const contact: Contact = { id: 1, fname: 'Anna', lname: 'Petrovich', phonenumber: '12345678901' } as Contact;
    const contacts: Contact[] = [contact];
    let httpClient: HttpClient;

    beforeEach(() => {
        const headers = new HttpHeaders({ 'x-total-count': '100' });
        const httpGetResponse = new HttpResponse({ body: contacts, headers });
        const httpPostResponse = new HttpResponse({ body: contact });
        configService = jasmine.createSpyObj('ConfigService', { getContactsUrl: contactsUrl });
        httpClient = jasmine.createSpyObj('HttpClient', {
            get: of(httpGetResponse),
            head: of(httpGetResponse),
            post: of(httpPostResponse)
        });
        service = new ContactsDataService(httpClient, configService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should get contacts url from config server', () => {
        const sub = service.getContacts(page, limit, filter).subscribe();
        expect(configService.getContactsUrl).toHaveBeenCalledTimes(1);
        sub.unsubscribe();
    });
    it('should call get paginated and filtered contacts list endpoint', () => {
        const sub = service.getContacts(page, limit, filter).subscribe(data => {
            expect(data.items).toEqual(contacts);
        });
        expect(httpClient.get).toHaveBeenCalledWith(`${contactsUrl}?page=${page}&limit=${limit}&filter=${filter}`, { observe: 'response' });
        sub.unsubscribe();
    });
    it('shoud call post contact add endpoint', () => {
        const sub = service.addContact(contact).subscribe(data => {
            expect(httpClient.post).toHaveBeenCalledWith(`${contactsUrl}`, contact);
            sub.unsubscribe();
        });
    });
});
