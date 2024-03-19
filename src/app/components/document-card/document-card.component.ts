import { Component, Input } from '@angular/core';
import { DocumentI } from 'models/documents';
import { timestampToDate } from '../../../utils/dates';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.scss',
})
export class DocumentCardComponent {
  @Input() document!: DocumentI;

  formatDate(doc: DocumentI) {
    return timestampToDate(doc.created);
  }
}
