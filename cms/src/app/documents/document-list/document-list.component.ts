import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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
  
  documents: Document[] = [];

  private subscription: Subscription;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute) {}
  
  

  ngOnInit() {
    this.documentService.getDocuments();

    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        console.log('Document List Component - Documents:', this.documents);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
