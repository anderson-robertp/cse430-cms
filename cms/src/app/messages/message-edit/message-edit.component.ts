import { Component, ElementRef, ViewChild } from '@angular/core';

import { Message } from '../messages.model';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;

  currentSender: string = '101';

  constructor(private messageService: MessagesService) {}

  onSendMessage(event: Event) {
    event.preventDefault();
    const subject = this.subjectInputRef.nativeElement.value.trim();
    const msgText = this.msgTextInputRef.nativeElement.value.trim();

    if (!subject || !msgText) {
      return;
    }
    
    var idNum = this.messageService.getMaxId() + 1; // Increment the max ID for new message
    const id = idNum.toString(); // Convert to string for ID

    //console.log(`Creating new message with ID: ${id}, Subject: ${subject}, Text: ${msgText}`);

    const newMessage = new Message(
      id, //ID
      subject, // subject
      msgText, // messageText
      this.currentSender, // sender
    );

    //console.log('New message created:', newMessage);

    this.messageService.addMessage(newMessage);

    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
