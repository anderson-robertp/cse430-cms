import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgText', { static: false }) msgTextInputRef: ElementRef;

  @Output() addMessageEvent = new EventEmitter< Message >();

  currentSender: string = 'Robert Anderson';

  constructor() {}

  onAddMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;

    if (!subject || !msgText) {
      return;
    }
    
    const newMessage = new Message(
      '1',
      subject,
      msgText,
      this.currentSender,
    );

    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
