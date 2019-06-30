import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactsResolver } from './resolvers/contacts.resolver';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatIconModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatToolbarModule
} from '@angular/material';
import { ContactComponent } from './components/contact/contact.component';
import { UpdateContactComponent } from './components/update-contact/update-contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterContactsComponent } from './components/filter-contacts/filter-contacts.component';
import { UploadDownloadContactsComponent } from './components/upload-download-contacts/upload-download-contacts.component';

@NgModule({
  declarations: [ContactsListComponent, ContactComponent, UpdateContactComponent, FilterContactsComponent, UploadDownloadContactsComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [ContactsResolver],
  entryComponents: [UpdateContactComponent]
})
export class ContactsModule { }
