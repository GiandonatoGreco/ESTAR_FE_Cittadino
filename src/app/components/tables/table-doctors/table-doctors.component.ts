import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DoctorI } from 'models/doctors';
import { routes as utilsRoutes } from '../../../../utils/routes';
import { PagerI } from 'models/common';

@Component({
  selector: 'app-table-doctors',
  templateUrl: './table-doctors.component.html',
  styleUrl: './table-doctors.component.scss',
})
export class TableDoctorsComponent implements OnChanges {
  routes = utilsRoutes;
  @Input() rows: DoctorI[] = [];
  heading: string[] = [
    'Disponibilità',
    'Medico',
    'Ambulatorio principale',
    'Distanza',
    'Tipologia',
  ];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.rows.length > 0) {
      // this.heading = Object.keys(this.rows[0]);
    }
  }

  orderBy(heading: string, type: 'asc' | 'desc') {
    console.log('ORDER BY', heading + '_' + type);
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
