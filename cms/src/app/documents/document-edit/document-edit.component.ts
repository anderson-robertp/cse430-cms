import { Component, OnInit } from '@angular/core';

import { Document } from '../documents.model';
import { NgForm } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})

export class DocumentEditComponent implements OnInit {
  
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (!id) {
        this.editMode = false;
        this.document = new Document('', '', '', '', []);
        return;
      }

      this.originalDocument = this.documentService.getDocument(id);

      if (!this.originalDocument) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));

    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;

    const newDocument = new Document(
      this.editMode ? this.originalDocument.id : this.documentService.getDocuments().length.toString(),
      value.name,
      value.description,
      value.url,
      []
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

}
