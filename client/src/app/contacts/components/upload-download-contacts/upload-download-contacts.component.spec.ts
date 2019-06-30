import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDownloadContactsComponent } from './upload-download-contacts.component';

describe('UploadDownloadContactsComponent', () => {
  let component: UploadDownloadContactsComponent;
  let fixture: ComponentFixture<UploadDownloadContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDownloadContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDownloadContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
