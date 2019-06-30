import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsListComponent } from './contacts-list.component';
import { of } from 'rxjs';

describe('ContactsListComponent', () => {
  let dataServiceMock;
  let dialogMock;
  let contact;
  let activatedRoute;
  let router;
  let comp;
  beforeAll(() => {
    contact = { id: 1, fname: 'fname' };
    activatedRoute = jasmine.createSpyObj('ActivatedRoute', ['url']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    dataServiceMock = jasmine.createSpyObj('ContactDataService', ['updateContact', 'deleteContact', 'setSelectedContact', 'addContact']);
    dialogMock = jasmine.createSpyObj('MatDialog', {
      open: { afterClosed() { return of(contact); } }
    });
    comp = new ContactsListComponent(activatedRoute, dataServiceMock, router, dialogMock);
  });
  it('should set selected contact and call view service updateContact', () => {
    comp.onEditContact(contact);
    expect(dataServiceMock.updateContact).toHaveBeenCalledTimes(1);
    expect(dataServiceMock.updateContact).toHaveBeenCalledWith(contact);
    expect(dataServiceMock.setSelectedContact).toHaveBeenCalledTimes(1);
    expect(dataServiceMock.setSelectedContact).toHaveBeenCalledWith(contact);
  });
  it('should call view service deleteContact', () => {
    comp.onDeleteContact(contact);
    expect(dataServiceMock.deleteContact).toHaveBeenCalledTimes(1);
    expect(dataServiceMock.deleteContact).toHaveBeenCalledWith(contact);
  });
  it('should call view service addContact', () => {
    comp.onAddContact();
    expect(dataServiceMock.addContact).toHaveBeenCalledTimes(1);
  });
});
