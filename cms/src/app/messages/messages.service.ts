import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient } from '@angular/common/http';
import { ContactsService } from '../contacts/contacts.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangedEvent = new EventEmitter<Message[]>();
  
  private messages: Message[] = [];
  
  constructor(
    private http: HttpClient,
    private contactsService: ContactsService
  ) {}

  getMaxId(): number {
    let maxId = 0;
    for (let m of this.messages) {
      let currentId = parseInt(m.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages() {
    this.contactsService.contacts$.subscribe(
      (contacts) => { if (contacts.length > 0) {
        console.log('Contacts are available, fetching messages...', contacts);
        this.http.get<Message[]>('http://localhost:3000/messages')
          .subscribe(
            (messages) => {
              this.messages = messages || [];
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
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error: any) => {
          console.error('Error storing messages:', error);
        }
      );
  }

  addMessage(message: Message) {
  if (!message) return;

  const headers = { 'Content-Type': 'application/json' };

  this.http.post<{ message: Message }>('http://localhost:3000/messages', message, { headers })
    .subscribe({
      next: (responseData) => {
        this.messages.push(responseData.message);
        this.sortAndSend();
      },
      error: (error) => {
        console.error('Error adding message:', error);
      }
    });
}

  sortAndSend() {
    this.messages.sort((a, b) => a.id.localeCompare(b.id));
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
