import { Component, Output, EventEmitter } from '@angular/core';

import { Document } from '../documents.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  documents: Document[] = [
    {
      id: '1',
      name: 'Document 1',
      description: 'Description of Document 1',
      url: 'https://example.com/doc1.pdf'
    },
    {
      id: '2',
      name: 'Document 2',
      description: 'Description of Document 2',
      url: 'https://example.com/doc2.pdf'
    },
    {
      id: '3',
      name: 'Document 3',
      description: 'Description of Document 3',
      url: 'https://example.com/doc3.pdf'
    }
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() {}
  
  onSelectedDocument(document: Document) {
    console.log('Selected document:', document);
    this.selectedDocumentEvent.emit(document);
  }
}
