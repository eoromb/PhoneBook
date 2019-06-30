import { Component, OnInit } from '@angular/core';
import { ContactsViewService } from '../../view-services/contacts-view.service';

/**
 * Component to make contacts uploading and downloading
 */
@Component({
  selector: 'app-upload-download-contacts',
  templateUrl: './upload-download-contacts.component.html',
  styleUrls: ['./upload-download-contacts.component.scss']
})
export class UploadDownloadContactsComponent implements OnInit {

  constructor(private contactsService: ContactsViewService) { }

  ngOnInit() {
  }
  /**
   * Uploads contacts to server
   * @param event event from file dialog
   */
  onUploadContacts(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length === 0) {
      return;
    }
    const file: File = fileList[0];
    this.contactsService.uploadContacts(file);
    event.target.value = '';
  }
  /**
   * Downloads contacts from server
   */
  onDownloadContacts() {
    this.contactsService.downloadContacts();
  }
}
