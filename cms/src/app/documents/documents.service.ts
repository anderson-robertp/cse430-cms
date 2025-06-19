import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})

export class DocumentsService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number; 

  constructor(
    private http: HttpClient
  ) {}

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
    this.http.get<Document[]>('https://cse430cms-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
      (documents) => {
        this.documents = documents || [];
        console.log('Fetched documents:', this.documents);
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error('Error fetching documents:', error);
      }
    )
  }

  storeDocuments() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const documentsJson = JSON.stringify(this.documents);

    this.http.put('https://cse430cms-default-rtdb.firebaseio.com/documents.json', documentsJson, { headers: headers })
      .subscribe(
        () => {
          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Error storing documents:', error);
        }
      );
  }

  getDocument(id: string): Document | null {
    return this.documents.find(doc => doc.id === id) || null;
  }

  documentSelectedEvent = new EventEmitter<Document>();

  //documentChangedEvent = new EventEmitter<Document[]>();

  addDocument(newDoc: Document) {
    if (!newDoc) return;
    this.documents.push(newDoc);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      console.error('Invalid original or new document');
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document || !document.id) {
      console.error('Invalid document or document ID');
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0 ) return;
    
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }
}
