import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsViewService } from '../../view-services/contacts-view.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

/**
 * Component to set contacts filter
 */
@Component({
  selector: 'app-filter-contacts',
  templateUrl: './filter-contacts.component.html',
  styleUrls: ['./filter-contacts.component.scss']
})
export class FilterContactsComponent implements OnInit, OnDestroy {
  filterForm: FormGroup;
  private subs: Subscription[] = [];
  private readonly debounceTimeout = 600;
  constructor(
    private contactsService: ContactsViewService,
    private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.createFilterForm();
  }
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
  private createFilterForm() {
    this.filterForm = this.formBuilder.group({
      nameFilter: [''],
    });
    this.subs.push(
      this.filterForm.valueChanges.pipe(
        debounceTime(this.debounceTimeout)
      ).subscribe(value => this.contactsService.setFilter(value.nameFilter)));
  }
}
