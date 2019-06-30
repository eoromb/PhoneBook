import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { createPagination } from 'src/app/shared/models/pagination.model';
import { ContactsViewService } from '../view-services/contacts-view.service';

/**
 * Service to resolve list of contacts
 */
@Injectable()
export class ContactsResolver implements Resolve<void> {
  constructor(
    private contactService: ContactsViewService
  ) {
  }
  /**
   * Resolves list of contact
   */
  resolve(route: ActivatedRouteSnapshot) {
    const page = +route.queryParamMap.get('page');
    const limit = +route.queryParamMap.get('limit');
    const pagination = createPagination(page, limit);
    this.contactService.getContacts(pagination.pageIndex, pagination.pageSize);
  }
}
