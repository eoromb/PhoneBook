import { ContactComponent } from './contact.component';
import { Contact } from '../../models/contact.model';

describe('ContactComponent', () => {
  const contact = {fname: 'FName'} as Contact;
  let comp;
  beforeAll(() => {
    comp = new ContactComponent();
    comp.contact = contact;
  });
  it('should emit editContact  when on edit clicked', () => {
    const sub = comp.editContact.subscribe(contactToEdit => expect(contactToEdit).toBe(contact));
    comp.onEditClicked();
    sub.unsubscribe();
  });
  it('should emit deleteContact  when on delete clicked', () => {
    const sub = comp.deleteContact.subscribe(contactToDelete => expect(contactToDelete).toBe(contact));
    comp.onEditClicked();
    sub.unsubscribe();
  });
});
