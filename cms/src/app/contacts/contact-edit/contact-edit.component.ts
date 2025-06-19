import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Contact } from '../contact.model';
import { DragDropService } from '../../drag-drop.service';


@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})

export class ContactEditComponent {
  originalContact: Contact;
  contact: Contact;
  editMode: boolean = false;
  groupContacts: Contact[] = [];
  id: string;
  isGroupContact: boolean = false;

  constructor(
    private contactService: ContactsService,
    private router: Router,
    private route: ActivatedRoute,
    private dragDropService: DragDropService
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

    const newContact = new Contact(
      this.editMode ? this.originalContact.id : this.contactService.getContacts().length.toString(),
      value.firstName,
      value.lastName,
      value.email,
      value.phone,
      this.groupContacts
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

  onDropSuccess(event: CdkDragDrop<Contact>) {
    const droppedContact = event.item.data;
    console.log('Dropped contact:', droppedContact);
    if (this.isInvalidContact(droppedContact)) {
      this.groupContacts.push(droppedContact);
    }

  }

  onEditContactGroup(contact: Contact) {
    this.contact = { ...contact};
    this.isGroupContact = true;
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      console.error('Invalid index for removing contact from group:', index);
      return;
    }
    this.groupContacts.splice(index, 1);
  }

  addToGroup(event: CdkDragDrop<Contact[]>) {
    const selectedContact: Contact = event.item.data;

    if (this.isInvalidContact(selectedContact)) {
      return;
    }

    this.groupContacts.push(selectedContact);
  }

  onDropContact() {
    const contact = this.dragDropService.getDraggedContact();
    if (contact && !this.isInvalidContact(contact)) {
      this.groupContacts.push(contact);
      this.dragDropService.clear();
    } else {
      console.warn('Invalid contact dropped or no contact available.');
    }
  }

}
