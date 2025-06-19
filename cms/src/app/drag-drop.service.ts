// drag-drop.service.ts
import { Injectable } from '@angular/core';
import { Contact } from '../app/contacts/contact.model';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  private draggedContact: Contact | null = null;

  setDraggedContact(contact: Contact) {
    this.draggedContact = contact;
  }

  getDraggedContact(): Contact | null {
    return this.draggedContact;
  }

  clear() {
    this.draggedContact = null;
  }
}
