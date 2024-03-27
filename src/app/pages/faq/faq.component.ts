import { Component, OnInit } from '@angular/core';
import { ItNotificationService } from 'design-angular-kit';
import { routes as utilsRoutes } from '../../../utils/routes';
import { BreadcrumbI } from 'models/common';
import { FaqI } from 'models/faq';
import { FaqService } from 'services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent implements OnInit {
  routes = utilsRoutes;
  crumbs: BreadcrumbI[] = [
    {
      link: utilsRoutes.dashboard.path,
      label: utilsRoutes.dashboard.title,
    },
    {
      link: utilsRoutes.faq.path,
      label: utilsRoutes.faq.title,
    },
  ];

  list: FaqI[] = [];

  toggleAnswer(faqItem: FaqI): void {
    this.list.forEach((item) => {
      if (item !== faqItem) {
        item.expanded = false;
      }
    });

    faqItem.expanded = !faqItem.expanded;
  }

  constructor(
    private faqService: FaqService,
    private readonly notificationService: ItNotificationService
  ) {}

  ngOnInit(): void {
    // get Faq list
    this.faqService.getFaqList().subscribe({
      next: (data) => {
        this.list = data;
      }, // nextHandler
      error: (error) => {
        console.log('Error:', error);
        this.notificationService.error('Notifica Errore', error?.message);
      }, // errorHandler
    });
  }
}
