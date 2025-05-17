import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Document } from '../documents.model';

@Component({
  selector: 'cms-document-item',
  standalone: false,
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() document: Document | null = null;

  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  onSelectedDocument() {
    console.log('Selected document:', this.document);
    if (this.document) {
      this.selectedDocumentEvent.emit(this.document);
    }
  }
}
