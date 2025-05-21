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

  currentSender: string = 'Robert Anderson';

  constructor(private messageService: MessagesService) {}

  onSendMessage(event: Event) {
    event.preventDefault();
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;

    if (!subject || !msgText) {
      return;
    }
    
    const newMessage = new Message(
      '99',
      subject,
      msgText,
      this.currentSender,
    );

    this.messageService.addMessage(newMessage);

    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
