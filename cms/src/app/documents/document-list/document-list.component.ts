import { Component } from '@angular/core';

import { Document } from '../documents.model';
import { DocumentsService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  
  documents: Document[] = [];

  constructor(private documentService: DocumentsService) {}
  
  onSelectedDocument(document: Document) {
    console.log('Selected document:', document);
    this.documentService.documentSelectedEvent.emit(document);
  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }
}
