import { Component } from '@angular/core';

import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    {
      id: '1',
      subject: 'Test message 1',
      sender: 'John Doe',
      msgText: 'This is a test message.',
    },
    {
      id: '2',
      subject: 'Test message 2',
      sender: 'Jane Smith',
      msgText: 'This is another test message.',
    },
    {
      id: '3',
      subject: 'Test message 3',
      sender: 'Alice Johnson',
      msgText: 'This is yet another test message.',
    },
    {
      id: '4',
      subject: 'Test message 4',
      sender: 'Bob Brown',
      msgText: 'This is a test message.',
    },
    {
      id: '5',
      subject: 'Test message 5',
      sender: 'Charlie Black',
      msgText: 'This is a test message.',
    },
    {
      id: '6',
      subject: 'Test message 6',
      sender: 'Diana White',
      msgText: 'This is a test message.',
    },
    {
      id: '7',
      subject: 'Test message 7',
      sender: 'Eve Green',
      msgText: 'This is a test message.',
    },
    {
      id: '8',
      subject: 'Test message 8',
      sender: 'Frank Blue',
      msgText: 'This is a test message.',
    },
    {
      id: '9',
      subject: 'Test message 9',
      sender: 'Grace Yellow',
      msgText: 'This is a test message.',
    },
    {
      id: '10',
      subject: 'Test message 10',
      sender: 'Hank Purple',
      msgText: 'This is a test message.',
    }
  ]

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
