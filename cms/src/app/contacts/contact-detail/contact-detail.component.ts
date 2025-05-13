import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  @Input() contact: Contact;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact']) {
      console.log('Contact changed:', changes['contact'].currentValue);
    }
  }
  ngOnInit() {
    console.log('Contact received on initialization:', this.contact);
  }

  constructor() {  }
}
