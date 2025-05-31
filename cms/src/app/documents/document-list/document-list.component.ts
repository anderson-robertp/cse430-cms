import { Component, OnInit } from '@angular/core';

import { Document } from '../documents.model';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  
  documents: Document[];

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute) {}
  
  

  ngOnInit() {
    this.documents = this.documentService.getDocuments();

    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        //console.log('Document List Component - Documents:', this.documents);
      }
    );
  }
}
