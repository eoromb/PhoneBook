import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterContactsComponent } from './filter-contacts.component';

describe('FilterContactsComponent', () => {
  let component: FilterContactsComponent;
  let fixture: ComponentFixture<FilterContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
