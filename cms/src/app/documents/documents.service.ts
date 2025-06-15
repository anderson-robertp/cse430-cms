import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
  private documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number; 

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
  return this.documents.find(doc => doc.id === id) || null;
}

  documentSelectedEvent = new EventEmitter<Document>();

  documentChangedEvent = new EventEmitter<Document[]>();

  addDocument(newDoc: Document) {
    if (!newDoc) return;

    this.maxDocumentId++;
    newDoc.id = this.maxDocumentId.toString();
    this.documents.push(newDoc);
    this.documentChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id; // Keep the same ID
    this.documents[pos] = newDocument;
    this.documentChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (!document || !document.id) {
      console.error('Invalid document or document ID');
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0 ) return;
    
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
    
  }
}
