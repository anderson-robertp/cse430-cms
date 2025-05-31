import { Injectable, EventEmitter } from '@angular/core';

import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
  return this.documents.find(doc => doc.id === id) || null;
}

  documentSelectedEvent = new EventEmitter<Document>();

  documentChangedEvent = new EventEmitter<Document[]>();

  deleteDocument(document: Document) {
    if (!document || !document.id) {
      console.error('Invalid document or document ID');
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0 ) return;
    
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
    
  }
}
