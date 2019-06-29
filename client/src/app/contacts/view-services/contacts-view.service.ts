import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContactsDataService } from '../data-services/contacts-data.service';
import { PaginatedList, createPaginatedList } from 'src/app/shared/models/paginated-list.model';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import FileSaver from 'file-saver';

@Injectable({
    providedIn: 'root'
})
export class ContactsViewService {

    private contactsSource = new BehaviorSubject<PaginatedList<Contact>>(createPaginatedList([]));
    contacts$: Observable<PaginatedList<Contact>> = this.contactsSource.asObservable();
    private contactsLoadingSource = new BehaviorSubject<boolean>(false);
    contactsLoading$ = this.contactsLoadingSource.asObservable();
    constructor(
        private contactsDataService: ContactsDataService,
        private notificationService: NotificationService) {

    }
    getContacts(page, limit) {
        this.setContactsLoading(true);
        this.contactsDataService.getContacts(page, limit)
            .pipe(
                catchError(this.processError('Uanble to load contacts')),
                tap(list => this.setContacts(list))
            )
            .subscribe(() => { this.setContactsLoading(false); });
    }
    addContact(contact) {
        this.setContactsLoading(true);
        this.contactsDataService.addContact(contact)
            .subscribe(() => this.reloadContacts(), this.processError('Unable to add contact'));
    }
    updateContact(contact) {
        this.setContactsLoading(true);
        this.contactsDataService.updateContact(contact)
            .subscribe(() => this.reloadContacts(), this.processError('Unable to update contact'));
    }
    deleteContact(contact) {
        this.contactsDataService.deleteContact(contact)
            .subscribe(() => this.reloadContacts(), this.processError('Unable to delete contact'));
    }
    downloadContacts() {
        this.contactsDataService.downloadContacts()
            .subscribe((fileData: Blob) => {
                FileSaver.saveAs(fileData, 'summary.csv');
            });
    }
    uploadContacts(file) {
        this.contactsDataService.uploadContacts(file)
            .subscribe(() => this.reloadContacts(), this.processError('Unable to delete contact'));
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
