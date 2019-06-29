import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsViewService } from '../../view-services/contacts-view.service';
import { PaginatedList, createPaginatedList } from 'src/app/shared/models/paginated-list.model';
import { Contact, createNewContact } from '../../models/contact.model';
import { Subscription } from 'rxjs';
import { PageEvent, MatDialog, MatDialogConfig } from '@angular/material';
import { UpdateContactComponent } from '../update-contact/update-contact.component';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  private readonly dialogConfig: MatDialogConfig = {
    disableClose: true,
    hasBackdrop: true,
    backdropClass: '',
    height: '',
    width: '300px',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    }
  };
  contactsLoading = false;
  private paginationContacts: PaginatedList<Contact> = createPaginatedList([]);
  /**
   * Contacts to show
   */
  get contacts() {
    return this.paginationContacts.items;
  }
  /**
   * Pagination object
   */
  get pagination() {
    return this.paginationContacts.pagination;
  }
  private subs: Subscription[] = [];
  constructor(private route: ActivatedRoute,
    private contactsService: ContactsViewService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.subs.push(this.contactsService.contacts$.subscribe(contacts => this.paginationContacts = contacts));
    this.subs.push(this.contactsService.contactsLoading$.subscribe(contactsLoading => this.contactsLoading = contactsLoading));
  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
  pageEvent(ev: PageEvent) {
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: { page: ev.pageIndex + 1, limit: ev.pageSize } });
  }
  addContactClicked() {
    const dialogRef = this.dialog.open(UpdateContactComponent, { ...this.dialogConfig, data: { contact: createNewContact() } });
    dialogRef.afterClosed().subscribe((contact: Contact) => {
      this.contactsService.addContact(contact);
    });
  }
  onEditContact(contact) {
    const dialogRef = this.dialog.open(UpdateContactComponent, { ...this.dialogConfig, data: { contact: { ...contact } } });
    dialogRef.afterClosed().subscribe((contact: Contact) => {
      this.contactsService.updateContact(contact);
    });
  }
  onDeleteContact(contact) {
    this.contactsService.deleteContact(contact);
  }
  onUploadContacts(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        this.contactsService.uploadContacts(file);
        event.target.value = '';
    }
  }
  onDownloadContacts() {
    this.contactsService.downloadContacts();
  }
}
