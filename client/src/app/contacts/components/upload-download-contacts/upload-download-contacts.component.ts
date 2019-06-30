import { Component, OnInit } from '@angular/core';
import { ContactsViewService } from '../../view-services/contacts-view.service';

@Component({
  selector: 'app-upload-download-contacts',
  templateUrl: './upload-download-contacts.component.html',
  styleUrls: ['./upload-download-contacts.component.scss']
})
export class UploadDownloadContactsComponent implements OnInit {

  constructor(private contactsService: ContactsViewService) { }

  ngOnInit() {
  }
  onUploadContacts(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length === 0) {
      return;
    }
    const file: File = fileList[0];
    this.contactsService.uploadContacts(file);
    event.target.value = '';
  }
  onDownloadContacts() {
    this.contactsService.downloadContacts();
  }
}
