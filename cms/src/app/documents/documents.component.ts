import { Component } from '@angular/core';

import { DocumentsService } from './documents.service';

@Component({
  selector: 'cms-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
  selectedDocument: Document | null = null;
  
  onDocumentSelected(document: Document) {
    this.selectedDocument = document;
    console.log('Selected Document:', document);
  }

  constructor(private documentService: DocumentsService) { }
  
  ngOnInit() { }

  getDocuments() {
    return this.documentService.getDocuments();
  }

  getDocument(id: string) {
    return this.documentService.getDocument(id);
  }
}
