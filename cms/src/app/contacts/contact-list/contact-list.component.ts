import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';


@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit, OnDestroy {
  
  contacts: Contact[] = [];
  private subscription: Subscription;
  term: string = '';

  constructor(private contactServe: ContactsService) { }

  ngOnInit() {
    this.contactServe.getContacts();
    this.subscription = this.contactServe.contacts$
      .subscribe((contacts) => {
        this.contacts = contacts;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
}
