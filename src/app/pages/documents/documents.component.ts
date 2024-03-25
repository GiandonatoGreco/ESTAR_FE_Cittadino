import { Component, OnInit } from '@angular/core';
import { BreadcrumbI } from 'models/common';
import { routes } from '../../../utils/routes';
import { DocumentsService } from 'services/documents.service';
import { ItNotificationService } from 'design-angular-kit';
import { DocumentI } from 'models/documents';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnInit {
  crumbs: BreadcrumbI[] = [
    {
      link: '/' + routes.dashboard.path,
      label: routes.dashboard.title,
    },
    {
      label: routes.documents.title,
    },
  ];
  received: DocumentI[] = [];
  sent: DocumentI[] = [];

  constructor(
    private documentsService: DocumentsService,
    private readonly notificationService: ItNotificationService
  ) {}

  ngOnInit(): void {
    this.documentsService.getDocumentsList().subscribe({
      next: ({ data }) => {
        this.received = data.received;
        this.sent = data.sent;
      }, // nextHandler
      error: (error) => {
        console.log('Error:', error);
        this.notificationService.error('Notifica Errore', error?.message);
      }, // errorHandler
    });
  }

  deleteDocument = () => {
    this.documentsService.deleteDocument().subscribe({
      error: (error) => {
        console.log('Error:', error);
        this.notificationService.error('Notifica Errore', error?.message);
      }, // errorHandler
      complete: () => {
        this.documentsService.getDocumentsList();
      }, // completeHandler
    });
  };
}
