import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';


@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit {
  
  contacts: Contact[] = [];

  onSelected(contact: Contact) {
    console.log('Contact emitted from ContactListComponent:', contact);
    this.contactServe.contactSelectedEvent.emit(contact);
  }

  constructor(private contactServe: ContactsService) {}

  ngOnInit() {
    this.contacts = this.contactServe.getContacts();
  }
}
