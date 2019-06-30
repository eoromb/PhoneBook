import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { PaginatedList, createPaginatedList } from 'src/app/shared/models/paginated-list.model';
import { createPagination, correctPaginationParams } from 'src/app/shared/models/pagination.model';
import { Contact } from '../models/contact.model';

/**
 * Service to operate with contact's API
 */
@Injectable({
    providedIn: 'root'
})
export class ContactsDataService {
    constructor(
        private http: HttpClient,
        private config: ConfigService
    ) {
    }
    /**
     * Creates Contact model from http resonse
     * @param data json http resonse from server
     */
    private static createContactFromHttpData(data: any): Contact {
        if (data == null) {
            return null;
        }
        return { ...data };
    }
    private static createHttpDataFromContract(contact: Contact): any {
        if (contact == null) {
            return null;
        }
        return { ...contact };
    }
    /**
     * Create query string to get paginated list
     * @param page page
     * @param limit limit
     */
    private static createQueryString(page, limit, filter) {
        let queryString = `page=${page}&limit=${limit}`;
        if (filter != null && filter !== '') {
            queryString += `&filter=${filter}`;
        }
        return queryString;
    }
    /**
     * Gets paginated list of contacts
     * @param page page to get
     * @param limit number of contact on page
     * @param filter filter to apply
     */
    getContacts(page, limit, filter): Observable<PaginatedList<Contact>> {
        const contactsUrl = this.config.getContactsUrl();
        const totalHeaderName = 'x-total-count';
        return this.http.head(`${contactsUrl}?${ContactsDataService.createQueryString(1, 1, filter)}`,
            { observe: 'response' }).pipe(switchMap(response => {
                const total = response.headers.get(totalHeaderName);
                const { pageIndex, pageSize } = correctPaginationParams(page, limit, +total);
                return this.http.get<Contact[]>(`${contactsUrl}?${ContactsDataService.createQueryString(pageIndex, pageSize, filter)}`,
                    { observe: 'response' }).pipe(
                        map((response: HttpResponse<Contact[]>) => {
                            const total = response.headers.get(totalHeaderName);
                            return createPaginatedList(
                                response.body.map(data => ContactsDataService.createContactFromHttpData(data)),
                                createPagination(pageIndex, pageSize, +total));
                        })
                    );
            }));
    }
    /**
     * Calles add contact API
     * @param contact contact to add
     */
    addContact(contact: Contact) {
        if (contact == null) {
            return of(null);
        }
        const contactsUrl = this.config.getContactsUrl();
        return this.http.post(contactsUrl, ContactsDataService.createHttpDataFromContract(contact));
    }
    /**
     * Calls update contact API
     * @param contact contact to update
     */
    updateContact(contact: Contact) {
        if (contact == null) {
            return of(null);
        }
        const contactsUrl = this.config.getContactsUrl();
        return this.http.put(`${contactsUrl}/${contact.id}`, ContactsDataService.createHttpDataFromContract(contact));
    }
    /**
     * Calls delete contact API
     * @param contact contact to delete
     */
    deleteContact(contact: Contact) {
        if (contact == null) {
            return of(null);
        }
        const contactsUrl = this.config.getContactsUrl();
        return this.http.delete(`${contactsUrl}/${contact.id}`);
    }
    /**
     * Calls download contacts API
     */
    downloadContacts() {
        const contactsUrl = this.config.getContactsUrl();
        return this.http.get(`${contactsUrl}/download`, { responseType: 'blob' });
    }
    /**
     * Uploads contacts
     * @param contactsFile contacts file to upload
     */
    uploadContacts(contactsFile) {
        const formData: FormData = new FormData();
        formData.append('file', contactsFile, contactsFile.name);
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        const options = { headers };
        const contactsUrl = this.config.getContactsUrl();
        return this.http.post(`${contactsUrl}/upload`, formData, options);
    }
}
