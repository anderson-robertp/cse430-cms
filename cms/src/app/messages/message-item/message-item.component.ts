import { Component, Input } from '@angular/core';

import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input () message: Message;
}
