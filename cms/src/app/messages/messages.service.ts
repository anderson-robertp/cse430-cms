import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangedEvent = new EventEmitter<Message[]>();
  
  private messages: Message[] = [];
  
  constructor(
    private http: HttpClient
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
    this.http.get<Message[]>('https://cse430cms-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages) => {
          this.messages = messages || [];
          console.log('Fetched messages:', this.messages);
          //this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error: any) => {
          console.error('Error fetching messages:', error);
        }
      );
  }

  getMessage(id: string) {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      } else {
        return null;
      }
    }
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
    console.log('Adding Message:', message);
    this.messages.push(message);
    this.storeMessages();
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
