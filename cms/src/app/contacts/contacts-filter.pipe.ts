import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    if (!contacts) return [];
    if (!term || term.trim() === '') return contacts;

    const lowerTerm = term.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerTerm)
    );
  }

}
