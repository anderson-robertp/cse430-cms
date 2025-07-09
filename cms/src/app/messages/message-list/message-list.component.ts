import { Component } from '@angular/core';

import { Message } from '../messages.model';
import { MessagesService } from '../messages.service';
import { ContactsService } from '../../contacts/contacts.service';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = []
  

  onAddMessage(message: Message) {
    this.messageServe.addMessage(message);
  }

  constructor(private messageServe: MessagesService) { }
  
  ngOnInit() {
    this.messageServe.getMessages();
    this.messageServe.messageChangedEvent.subscribe((messages) => {
        this.messages = messages;
      }
    );
  }
}
