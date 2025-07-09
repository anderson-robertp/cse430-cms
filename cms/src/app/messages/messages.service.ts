import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient } from '@angular/common/http';
import { ContactsService } from '../contacts/contacts.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangedEvent = new BehaviorSubject<Message[]>([]);
  
  private messages: Message[] = [];
  
  constructor(
    private http: HttpClient,
    private contactsService: ContactsService
  ) {}

  getMaxId(): number {
    let maxId = 0;
    for (let m of this.messages) {
      if (!m || !m.id) continue; // skip undefined or invalid messages
      let currentId = parseInt(m.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages() {
    this.contactsService.getContacts(); // Ensure contacts are loaded before fetching messages
    this.contactsService.contacts$.subscribe(
      (contacts) => { if (contacts.length > 0) {
        //console.log('Contacts are available, fetching messages...', contacts);
        this.http.get<Message[]>('http://localhost:3000/messages')
          .subscribe(
            (messages) => {
              this.messages = messages ?? [];
              //console.log('Fetched messages:', this.messages);
              //this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
              this.getMaxId();
              this.sortAndSend();
            },
            (error: any) => {
              console.error('Error fetching messages:', error);
            }
          );
      }
    });
  }

  getMessage(id: string) {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      } 
    }
    return null;
  }

  storeMessages() {
    const messagesJson = JSON.stringify(this.messages);
    this.http.put('https://cse430cms-default-rtdb.firebaseio.com/messages.json', messagesJson)
      .subscribe(
        () => {
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error('Error storing messages:', error);
        }
      );
  }

  addMessage(message: Message) {
    //console.log('Adding message:', message);
    if (!message) {
      console.warn('No message provided to addMessage');
      return;
    }

      const headers = { 'Content-Type': 'application/json' };

      this.http.post<Message>('http://localhost:3000/messages', message, { headers })
        .subscribe({
          next: (responseData: Message) => {
            //console.log('Response from server:', responseData);
            this.messages.push(responseData);
            //console.log('Message added successfully:', responseData);
            this.sortAndSend();
          },
          error: (error) => {
            console.error('Error adding message:', error);
          }
        }
      );
    }

  sortAndSend() {
    this.messages.sort((a, b) => {
      return parseInt(a.id, 10) - parseInt(b.id, 10);
    });
    console.log('Messages sorted:', this.messages);
    this.messageChangedEvent.next(this.messages.slice());
  }
}
