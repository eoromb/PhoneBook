import { Component, OnInit } from '@angular/core';
import { ContactsViewService } from '../../view-services/contacts-view.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filter-contacts',
  templateUrl: './filter-contacts.component.html',
  styleUrls: ['./filter-contacts.component.scss']
})
export class FilterContactsComponent implements OnInit {
  filterForm: FormGroup;
  constructor(
    private contactsService: ContactsViewService,
    private formBuilder: FormBuilder) {
    this.createFilterForm();
  }

  ngOnInit() {
  }
  private createFilterForm() {
    this.filterForm = this.formBuilder.group({
      nameFilter: [''],
    });
    this.filterForm.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.contactsService.setFilter(value.nameFilter));
  }
}
