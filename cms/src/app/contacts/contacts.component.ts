import { Component } from '@angular/core';

import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {
  selectedContact: Contact;

  contactSelectedFromList(contact: Contact) {
    this.selectedContact = contact;
    console.log('Selected contact in Contact Component:', contact);
  }
  testLog(event: any) {
    console.log('Test log:', event);
  }

  constructor() { }

  
}
