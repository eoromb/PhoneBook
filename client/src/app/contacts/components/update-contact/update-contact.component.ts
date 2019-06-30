import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contact } from '../../models/contact.model';
import { ContactsViewService } from '../../view-services/contacts-view.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validatePhone } from '../../validators/phone.validator';
/**
 * Component to make contact updating
 */
@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.scss']
})
export class UpdateContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  contact: Contact;
  valueChanged = false;
  subs: Subscription[] = [];
  constructor(
    private dialogRef: MatDialogRef<UpdateContactComponent>,
    private contactService: ContactsViewService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.subs.push(this.contactService.selectedContact$.subscribe(contact => this.setContact(contact)));
  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
  /**
   * Save button handler
   */
  onSave() {
    this.setContactValueFromForm(this.contactForm.value);
    this.dialogRef.close(this.contact);
  }
  /**
   * Close button handler
   */
  onClose() {
    this.dialogRef.close();
  }
  private setContact(contact) {
    this.contact = contact;
    this.setFormValueFromContact(contact);
  }
  private setFormValueFromContact(contact) {
    this.contactForm.setValue({ firstName: contact.fname, lastName: contact.lname, phoneNumber: contact.phonenumber });
  }
  private setContactValueFromForm(value) {
    this.contact.fname = value.firstName;
    this.contact.lname = value.lastName;
    this.contact.phonenumber = value.phoneNumber;
  }
  private setValueChanged(value) {
    this.valueChanged = this.contact.fname !== value.firstName ||
      this.contact.lname !== value.lastName ||
      this.contact.phonenumber !== value.phoneNumber;
  }
  private createForm() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, validatePhone]]
    });
    this.contactForm.valueChanges.subscribe(formValue => this.setValueChanged(formValue));
  }
}
