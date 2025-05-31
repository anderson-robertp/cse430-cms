import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  contact: Contact;
  id: string;

  constructor(
    private contactService: ContactsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['contact']) {
      console.log('Contact changed:', changes['contact'].currentValue);
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.contact = this.contactService.getContact(id);
    });
    console.log('Contact received on initialization:', this.contact);
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }

  
}
