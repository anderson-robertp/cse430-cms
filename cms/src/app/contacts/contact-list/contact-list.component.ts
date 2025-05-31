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

  constructor(private contactServe: ContactsService) {}

  ngOnInit() {
    this.contacts = this.contactServe.getContacts();
    this.contactServe.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }
}
