import { Component } from '@angular/core';
import { AccordionItem } from 'components/accordion/accordion.component';
import { AutocompleteItem, SelectControlOption } from 'design-angular-kit';
import { BarChartDataI, PieChartDataI } from 'models/charts';
import { PagerI } from 'models/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  options?: SelectControlOption[] = [
    {
      value: 1,
      text: 'Opz1',
    },
    {
      value: 2,
      text: 'Opz2',
    },
    {
      value: 3,
      text: 'Opz3',
    },
  ];
  autocompleteOptions: AutocompleteItem[] = [
    {
      value: 'Luisa Neri',
      avatarSrcPath: 'https://randomuser.me/api/portraits/women/44.jpg',
      avatarAltText: 'Luisa Neri',
      label: 'Profilo',
    },
    {
      value: 'Cristian Borelli',
      avatarSrcPath: 'https://randomuser.me/api/portraits/men/1.jpg',
      avatarAltText: 'Cristian Borelli',
      label: 'Profilo',
    },
    {
      value: 'Andrea Stagi',
      avatarSrcPath: 'https://randomuser.me/api/portraits/men/2.jpg',
      avatarAltText: 'Andrea Stagi',
      label: 'Profilo',
    },
    {
      value: 'Comune di Firenze',
      icon: 'pa',
      link: 'https:www.comune.fi.it/',
      label: 'Comune',
    },
    {
      value: 'Italia',
      avatarSrcPath:
        'https:raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/it.svg',
      avatarAltText: 'Italia',
    },
  ];
  accordionItems: AccordionItem[] = [
    {
      title: 'Domanda 1?',
      text: 'Risposta 1',
    },
    {
      title: 'Domanda 2?',
      text: 'Risposta 2',
    },
  ];
  barChartData: BarChartDataI[] = [
    {
      name: 'Arezzo',
      value: 894000,
    },
    {
      name: 'Firenze',
      value: 950000,
    },
    {
      name: 'Grosseto',
      value: 720000,
    },
    {
      name: 'Livorno',
      value: 894000,
    },
  ];
  pieChartData: PieChartDataI[] = [
    {
      name: 'Firenze',
      value: 20,
      label: '20%',
    },
    {
      name: 'Lucca',
      value: 70,
      label: '70%',
    },
    {
      name: 'Siena',
      value: 10,
      label: '10%',
    },
    {
      name: 'Livorno',
      value: 10,
      label: '10%',
    },
  ];

  constructor() {}

  callback(msg = 'Test per btns') {
    console.log(msg);
  }
  onChangeItem(item: AutocompleteItem): void {
    console.log('callback', item);
  }

  pager: PagerI = {
    total_items: 200,
    page: 0,
    items_per_page: 10,
    number_of_pages: 20,
  };
  pagerCallback(value: any): void {
    console.log('CB', value);
  }
}
