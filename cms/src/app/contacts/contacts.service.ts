import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    this.http.get<Contact[]>('http://localhost:3000/contacts')
      .subscribe(
        (contacts) => {
          this.contacts = contacts || [];
          //console.log('Fetched contacts:', this.contacts);
          this.maxContactId = this.getMaxId();
          this.sortAndSend();
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
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactListChangedEvent.next(this.contacts.slice());
          this.contacts$.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error storing contacts:', error);
        }
      );
  } 

  addContact(newContact: Contact) {
    if (!newContact) {
      console.error('No contact provided to addContact');
      return;
    }

    //Reset the ID if it is not set
    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<Contact>(
      'http://localhost:3000/contacts',
      newContact,
      { headers: headers }
    ).subscribe({
      next: (response: Contact) => {
        console.log('Contact added:', response);
        this.contacts.push(response);
        this.sortAndSend();
      },
      error: (error) => {
        console.error('Error adding contact:', error);
      }
    });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id; // Keep the same ID
    //newContact._id = originalContact._id; // Keep the same _id if using MongoDB
    
    // Update the contact on the server
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(`http://localhost:3000/contacts/${originalContact.id}`, 
      newContact, { headers: headers })
      .subscribe({
        next: (response) => {
          console.log('Contact updated:', response);
          this.contacts[pos] = newContact; // Update the local array
          this.sortAndSend(); // Sort and send the updated list
        },
        error: (error) => {
          console.error('Error updating contact:', error);
        }
      });
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  getContact(id: string): Contact | null {
    //console.log('Getting contact with ID:', id);
    //console.log('Current contacts:', this.contacts);
    const foundContact = this.contacts.find(contact => contact.id === id) || null;
    //console.log('Found contact:', foundContact);
    return foundContact;
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
    this.http.delete(`http://localhost:3000/contacts/${contact.id}`)
      .subscribe({
        next: (response) => {
          console.log('Contact deleted:', response);
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        },
        error: (error) => {
          console.error('Error deleting contact:', error);
        }
      }
    );
  }

  setGroupContacts(contacts: Contact[]) {
    this.groupContacts$.next(contacts.slice());
  }

  sortAndSend() {
    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
    this.contacts$.next(this.contacts.slice());
  }

}
