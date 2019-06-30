import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from '../../models/contact.model';
/**
 * Presentational component for contact
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  /**
   * Contact to show
   */
  @Input() contact: Contact;
  /**
   * Emitted on contact edit click
   */
  @Output() editContact: EventEmitter<Contact> = new EventEmitter();
  /**
   * Emitted on contact delete click
   */
  @Output() deleteContact: EventEmitter<Contact> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onEditClicked() {
    this.editContact.emit(this.contact);
  }
  onDeleteClicked() {
    this.deleteContact.emit(this.contact);
  }
}
