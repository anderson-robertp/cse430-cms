import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  standalone: false,
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Input() contact: Contact;

  @Output() contactSelected = new EventEmitter<Contact>();

  constructor() {  }

  onSelected() {
    console.log('Contact selected in contact-list:', this.contact);
    this.contactSelected.emit(this.contact);
  }

}
