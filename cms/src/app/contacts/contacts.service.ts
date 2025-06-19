import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts: Contact[] = [];
  private maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  contacts$ = new BehaviorSubject<Contact[]>([]);
  groupContacts$ = new BehaviorSubject<Contact[]>([]);

  constructor(
    private http: HttpClient
  ) {}

  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getContacts() {
    this.http.get<Contact[]>('https://cse430cms-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts) => {
          this.contacts = contacts || [];
          console.log('Fetched contacts:', this.contacts);
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          //this.contactListChangedEvent.next(this.contacts.slice());
          this.contacts$.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      )
  }

  storeContacts() {
    const contactsJson = JSON.stringify(this.contacts);
    this.http.put('https://cse430cms-default-rtdb.firebaseio.com/contacts.json', contactsJson)
      .subscribe(
        () => {
          this.contacts$.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error storing contacts:', error);
        }
      );
  } 

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    //newContact.id = originalContact.id; // Keep the same ID
    this.contacts[pos] = newContact;
    this.storeContacts();
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

  deleteContact(contact: Contact) {
    if (!contact) {
      console.error('Invalid contact');
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  setGroupContacts(contacts: Contact[]) {
    this.groupContacts$.next(contacts.slice());
  }
}
