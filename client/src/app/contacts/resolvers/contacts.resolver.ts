import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { createPagination } from 'src/app/shared/models/pagination.model';
import { ContactsViewService } from '../view-services/contacts-view.service';
import { PaginatedList, createPaginatedList } from 'src/app/shared/models/paginated-list.model';
import { Contact } from '../models/contact.model';

@Injectable()
export class ContactsResolver implements Resolve<void> {
  constructor(
    private contactService: ContactsViewService
  ) {
  }
  resolve(route: ActivatedRouteSnapshot) {
    const page = +route.queryParamMap.get('page');
    const limit = +route.queryParamMap.get('limit');
    const pagination = createPagination(page, limit);
    this.contactService.getContacts(pagination.pageIndex, pagination.pageSize);
  }
}
