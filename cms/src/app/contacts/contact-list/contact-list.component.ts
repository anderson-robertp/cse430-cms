import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactsService } from '../contacts.service';
import { DragDropService } from '../../drag-drop.service';


@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})

export class ContactListComponent implements OnInit, OnDestroy {
  
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(
    private contactServe: ContactsService,
    private dragDropService: DragDropService) {}

  ngOnInit() {
    this.contacts = this.contactServe.getContacts();
    this.subscription = this.contactServe.contactChangedEvent
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDragStart(contact: Contact) {
    this.dragDropService.setDraggedContact(contact);
  }
}
