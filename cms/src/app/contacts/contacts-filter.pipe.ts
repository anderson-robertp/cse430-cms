import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contects: Contact[], term: string): Contact[] {
    let filteredContacts: Contact[] = [];

    if (term && term.length > 0) {
      const searchTerm = term.toLowerCase();
      filteredContacts = contects.filter(contact => {
        return contact.name.toLowerCase().includes(searchTerm) ||
               contact.email.toLowerCase().includes(searchTerm) ||
               contact.phone.toLowerCase().includes(searchTerm);
      });
    }

    return filteredContacts.length > 0 ? filteredContacts : contects;
  }

}
