import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TableRowI } from 'models/common';

// TEMPLATE FOR SIMPLE TABLE --> STRING | NUMBER td ONLY!

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
  @Input() rows: TableRowI[] = [];
  @Input() hover: boolean = false;

  heading: string[] = [];

  constructor(private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.rows.length > 0) {
      this.heading = Object.keys(this.rows[0]);
    }
  }

  onClickRow(row: TableRowI) {
    if (!this.hover) return;
    console.log(row);
    this.router.navigate(['doctors', row['id']]);
  }

  orderBy(heading: string, type: 'asc' | 'desc') {
    console.log('ORDER BY', heading + '_' + type);
  }
}
