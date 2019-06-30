import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContactsDataService } from '../data-services/contacts-data.service';
import { PaginatedList, createPaginatedList } from 'src/app/shared/models/paginated-list.model';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import FileSaver from 'file-saver';

/**
 * Service to store view state
 */
@Injectable({
    providedIn: 'root'
})
export class ContactsViewService {
    private filterSource = new BehaviorSubject<string | null>(null);
    filter$: Observable<string | null> = this.filterSource.asObservable();
    private selectedContactSource = new BehaviorSubject<Contact>(null);
    selectedContact$: Observable<Contact> = this.selectedContactSource.asObservable();
    private contactsSource = new BehaviorSubject<PaginatedList<Contact>>(createPaginatedList([]));
    contacts$: Observable<PaginatedList<Contact>> = this.contactsSource.asObservable();
    private contactsLoadingSource = new BehaviorSubject<boolean>(false);
    contactsLoading$ = this.contactsLoadingSource.asObservable();
    constructor(
        private contactsDataService: ContactsDataService,
        private notificationService: NotificationService) {
    }
    /**
     * Gets contacts from data service
     * @param page page number
     * @param limit number of contacts on page
     */
    getContacts(page, limit) {
        this.setContactsLoading(true);
        this.contactsDataService.getContacts(page, limit, this.filterSource.getValue())
            .subscribe(list => {
                this.setContactsLoading(false);
                this.setContacts(list);
            }, this.processError('Unable to load contacts'));
    }
    /**
     * Adds contact to data service
     * @param contact contact to add
     */
    addContact(contact) {
        this.setContactsLoading(true);
        this.contactsDataService.addContact(contact)
            .subscribe(() => this.reloadContacts(), this.processError('Unable to add contact'));
    }
    /**
     * Updates contact at data service
     * @param contact contact to update
     */
    updateContact(contact) {
        this.setContactsLoading(true);
        this.contactsDataService.updateContact(contact)
            .subscribe(() => this.reloadContacts(), this.processError('Unable to update contact'));
    }
    /**
     * Deletes contact at data service
     * @param contact contact to вудуеу
     */
    deleteContact(contact) {
        this.contactsDataService.deleteContact(contact)
            .subscribe(() => this.reloadContacts(), this.processError('Unable to delete contact'));
    }
    /**
     * Downloads contacts from data service
     */
    downloadContacts() {
        this.contactsDataService.downloadContacts()
            .subscribe((fileData: Blob) => {
                FileSaver.saveAs(fileData, 'summary.csv');
            }, this.processError('Unable to download contacts'));
    }
    /**
     * Uploads contacts file to service
     * @param file contacts file to upload
     */
    uploadContacts(file) {
        this.contactsDataService.uploadContacts(file)
            .subscribe(() => {
                this.showInfo(`Contacts from file '${file.name}' were successfully uploaded.`);
                this.reloadContacts();
            }, this.processError('Unable to upload contacts'));
    }
    /**
     * Sets contact as selected one
     * @param contact contact to set as selected one
     */
    setSelectedContact(contact) {
        this.selectedContactSource.next(contact);
    }
    /**
     * Set filter for contacts
     * @param filter filter to be used on get contacts
     */
    setFilter(filter) {
        this.filterSource.next(filter);
        this.reloadContacts();
    }
    private reloadContacts() {
        const pagination = this.contactsSource.getValue().pagination;
        let page;
        let limit;
        if (pagination != null) {
            page = pagination.pageIndex;
            limit = pagination.pageSize;
        }
        this.getContacts(page, limit);
    }
    private setContacts(contacts) {
        this.contactsSource.next(contacts);
    }
    private setContactsLoading(contactsLoading) {
        this.contactsLoadingSource.next(contactsLoading);
    }
    private showInfo(message) {
        this.notificationService.showInfo(message, '');
    }
    private processError(message) {
        return (error) => {
            if (error instanceof HttpErrorResponse && error.status === 400 && error.error && Array.isArray(error.error.errors)) {
                this.notificationService.showErrors(message, error.error.errors);
            } else {
                this.notificationService.showError(message, '');
            }
            this.setContactsLoading(false);
            return of(createPaginatedList([]));
        };
    }
}
