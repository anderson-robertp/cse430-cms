import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { R } from '@angular/cdk/keycodes';

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
    this.http.get<Document[]>('http://localhost:3000/documents')
    .subscribe(
      (documents) => {
        this.documents = documents || [];
        console.log('Fetched documents:', this.documents);
        this.maxDocumentId = this.getMaxId();
        this.sortAndSend();
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

  addDocument(document: Document) {
    if (!document) {
      console.warn('No document provided to addDocument');
      return;
    }

    // Reset id so backend assigns a new one
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<Document>(
      'http://localhost:3000/documents',
      document,
      { headers: headers }
    ).subscribe({
      next: (responseData: Document) => {
        console.log('Document added successfully:', responseData);

        // Add new document to local array
        this.documents.push(responseData);
        this.sortAndSend();
      },
      error: (error) => {
        console.error('Error adding document:', error);
      }
    });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      console.error('Invalid original or new document');
      return;
    }
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) {
      return;
    }
    // Set id to original document's id
    newDocument.id = originalDocument.id;
    //newDocument._id = originalDocument._id;

    // Update the document on the server
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(`http://localhost:3000/documents/${originalDocument.id}`, 
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
         this.documents[pos] = newDocument;
         this.sortAndSend();
        },)
  }

  deleteDocument(document: Document) {
    if (!document || !document.id) {
      console.error('Invalid document or document ID');
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0 ) return;
    
    this.http.delete(`http://localhost:3000/documents/${document.id}`)
      .subscribe(
        (response: Response) => {
          console.log('Document deleted successfully:', response);
          this.documents.splice(pos, 1);
          this.sortAndSend();
        },
        (error: any) => {
          console.error('Error deleting document:', error);
        }
      );
  }

  sortAndSend() {
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
