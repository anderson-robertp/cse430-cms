import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangedEvent = new EventEmitter<Message[]>();
  
  private messages: Message[] = [];
  
  constructor() {
    this.messages = MOCKMESSAGES
  }

  getMessages() {
    return this.messages.slice();
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

  addMessage(message: Message) {
    console.log('Adding Message:', message);
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
}
