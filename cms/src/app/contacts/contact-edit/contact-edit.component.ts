import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { Contact } from '../contact.model';


@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})

export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  editMode: boolean = false;
  groupContacts: Contact[] = [];
  contacts: Contact[] = [];
  id: string;

  constructor(
    private contactService: ContactsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      console.log('Contact ID:', this.id);

      if (!this.id) {
        this.editMode = false;
        this.contact = new Contact('', '', '', '', '', []);
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);

      if (!this.originalContact) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      
      if (this.contact.group && this.contact.group.length > 0) {
        this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
      }
    });
    //this.groupContacts = this.contactService.getContacts();
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newId = this.editMode
    ? this.originalContact.id
    : (this.contactService.getMaxId() + 1).toString();

    const newContact = new Contact(
      newId,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts.slice() // Create a copy of the groupContacts array
    );

    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) return true;
    if (this.contact?.id === newContact.id) return true;
    return this.groupContacts.some(c => c.id === newContact.id);
  }

  onDropSuccess(event: CdkDragDrop<Contact[]>) {
  if (event.previousContainer !== event.container) {
    const draggedContact = event.previousContainer.data[event.previousIndex];
    console.log('Dragged Contact:', draggedContact);
    if (this.isInvalidContact(draggedContact)) {
      // Ignore duplicates
      console.log('Duplicate or invalid contact, ignoring.');
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    console.log('Contact added to group.')
  }
}

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) return;
    this.groupContacts.splice(index, 1);
  }



}
