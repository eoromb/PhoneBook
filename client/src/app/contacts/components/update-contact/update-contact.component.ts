import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.scss']
})
export class UpdateContactComponent implements OnInit {
  contact: Contact;
  constructor(
    public dialogRef: MatDialogRef<UpdateContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.contact = data.contact;
  }

  ngOnInit() {
  }

  onSaveClicked() {
    this.dialogRef.close(this.contact);
  }
}
