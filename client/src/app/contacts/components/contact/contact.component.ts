import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Input() contact: Contact;
  @Output() editContact: EventEmitter<Contact> = new EventEmitter();
  @Output() deleteContact: EventEmitter<Contact> = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  onEditClicked() {
    this.editContact.emit(this.contact);
  }
  onDeleteClicked() {
    this.deleteContact.emit(this.contact);
  }
}
