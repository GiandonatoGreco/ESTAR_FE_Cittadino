import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DocumentI } from 'models/documents';
import {
  formatDate,
  formatSize,
  getExpiration,
} from '../../../utils/documents';
import { DocumentsService } from 'services/documents.service';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.scss',
})
export class DocumentCardComponent implements OnChanges {
  @Input() document!: DocumentI;
  @Input() isSent: boolean = false;

  constructor(private documentsService: DocumentsService) {}

  fileSize: string = '';
  fileCreationDate: string = '';
  fileExpiration: 'tomorrow' | 'today' = 'tomorrow';

  ngOnChanges(changes: SimpleChanges): void {
    this.fileSize = formatSize(this.document);
    this.fileCreationDate = formatDate(this.document);
    this.fileExpiration = getExpiration(this.document);
  }

  setCurrentDocument() {
    this.documentsService.selectedDocument = this.document.id;
  }
}
