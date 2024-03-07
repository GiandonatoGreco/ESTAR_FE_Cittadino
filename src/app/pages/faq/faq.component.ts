import { Component } from '@angular/core';
import { routes as utilsRoutes } from '../../../utils/routes';
import { BreadcrumbI } from 'models/common';

interface FaqItem {
  question: string;
  answer: string;
  expanded: boolean;
} 
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  faqList: FaqItem[] = [
    { question: 'Chi può accedere al servizio di cambio medico?', answer: 'Lorem ipsum dolor sit amet consectetur. Vestibulum quis ipsum venenatis at diam tortor morbi leo sem.', expanded: false },
    { question: 'Che cosa consente di fare il servizio?', answer: 'Lorem ipsum dolor sit amet consectetur. Vestibulum quis ipsum venenatis at diam tortor morbi leo sem.', expanded: false },
    { question: 'Che cosa non consente di fare il servizio?', answer: 'Lorem ipsum dolor sit amet consectetur. Vestibulum quis ipsum venenatis at diam tortor morbi leo sem.', expanded: false },
    { question: 'Posso scegliere qualunque medico?', answer: 'Lorem ipsum dolor sit amet consectetur. Vestibulum quis ipsum venenatis at diam tortor morbi leo sem.', expanded: false },
    { question: 'Come può essere selezionato un medico o un pediatra per un soggetto minorenne?', answer: 'Lorem ipsum dolor sit amet consectetur. Vestibulum quis ipsum venenatis at diam tortor morbi leo sem.', expanded: false },
    { question: 'Il sistema consente di fare anche la prima scelta, oppure per la prima scelta è necessario recarsi agli sportelli USL?', answer: 'Lorem ipsum dolor sit amet consectetur. Vestibulum quis ipsum venenatis at diam tortor morbi leo sem.', expanded: false },
    { question: 'Da quando decorre la scelta del nuovo medico?', answer: 'Lorem ipsum dolor sit amet consectetur. Vestibulum quis ipsum venenatis at diam tortor morbi leo sem.', expanded: false },
    { question: 'Cosa succede nel caso in cui il suo medico cessi la propria attività?', answer: 'Lorem ipsum dolor sit amet consectetur. Vestibulum quis ipsum venenatis at diam tortor morbi leo sem.', expanded: false },
  ];

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

  toggleAnswer(faqItem: FaqItem): void {

    this.faqList.forEach(item => {
      if (item !== faqItem) {
        item.expanded = false;
      }
    });
  
    faqItem.expanded = !faqItem.expanded;
  }


}