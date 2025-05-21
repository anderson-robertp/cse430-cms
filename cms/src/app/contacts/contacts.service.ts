import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts: Contact[] = [];

  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string) {
    //console.log('Looking For Contact ID:', id);
    for (let contact of this.contacts) {
      if (contact.id === id) {
        //console.log('Contact found:', contact);
        return contact;
      }
    }
    return null;
  }

  
}
