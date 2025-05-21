import { Component, Input, OnInit } from '@angular/core';

import { Message } from '../messages.model';
import { Contact } from '../../contacts/contact.model';

import { ContactsService } from '../../contacts/contacts.service';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;

  messageSender: string;

  constructor(private messageServe: MessagesService, private contactServe: ContactsService) {}

  ngOnInit() {
    if (!this.message) {
      console.log('No message provided');
      return;
    }
    const contact: Contact = this.contactServe.getContact(this.message.sender);
    
    if (contact) {
      this.messageSender = contact.name;
    } else {
      this.messageSender = this.message.sender;
    }

    console.log('Message sender:', this.message.sender);
    console.log('Contact:', contact);
    //this.messageSender = contact?.name ?? 'Unknown Sender';
    
  }
}
