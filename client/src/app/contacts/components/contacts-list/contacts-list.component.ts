import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsViewService } from '../../view-services/contacts-view.service';
import { PaginatedList, createPaginatedList } from 'src/app/shared/models/paginated-list.model';
import { Contact, createNewContact } from '../../models/contact.model';
import { Subscription } from 'rxjs';
import { PageEvent, MatDialog, MatDialogConfig } from '@angular/material';
import { UpdateContactComponent } from '../update-contact/update-contact.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

/**
 * Component to show list of contacts
 */
@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit, OnDestroy {
  private readonly updateDialogConfig: MatDialogConfig = {
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
  private readonly deleteConfirmationDialogConfig: MatDialogConfig = {
    disableClose: true,
    hasBackdrop: true,
    backdropClass: '',
    width: '350px',
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
  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsViewService,
    private router: Router,
    private dialog: MatDialog) {
  }
  ngOnInit() {
    this.subs.push(this.contactsService.contacts$.subscribe(contacts => this.paginationContacts = contacts));
    this.subs.push(this.contactsService.contactsLoading$.subscribe(contactsLoading => this.contactsLoading = contactsLoading));
  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
  /**
   * Processes pagination event
   * @param ev pagination event
   */
  pageEvent(ev: PageEvent) {
    this.router.navigate(['./'], { relativeTo: this.route, queryParams: { page: ev.pageIndex + 1, limit: ev.pageSize } });
  }
  /**
   * Processes contact adding
   */
  onAddContact() {
    this.contactsService.setSelectedContact(createNewContact());
    const dialogRef = this.dialog.open(UpdateContactComponent, { ...this.updateDialogConfig });
    dialogRef.afterClosed().subscribe((contact: Contact) => {
      if (contact == null) {
        return;
      }
      this.contactsService.addContact(contact);
    });
  }
  /**
   * Processes contact editing
   */
  onEditContact(contact) {
    this.contactsService.setSelectedContact({ ...contact });
    const dialogRef = this.dialog.open(UpdateContactComponent, { ...this.updateDialogConfig });
    dialogRef.afterClosed().subscribe((updatedContact: Contact) => {
      if (updatedContact == null) {
        return null;
      }
      this.contactsService.updateContact(updatedContact);
    });
  }
  /**
   * Processes contact deleting
   */
  onDeleteContact(contact) {
    if (contact == null) {
      return null;
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      ...this.deleteConfirmationDialogConfig,
      data: `Do you want to delete contact ${contact.fname} ${contact.lname}?`
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactsService.deleteContact(contact);
      }
    });
  }
}
