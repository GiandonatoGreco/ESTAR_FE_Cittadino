import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PagerI } from 'models/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  @Input() alignment?: 'center' | 'end';
  @Input() pager!: PagerI;
  @Input() callback!: Function;
  @Input() showChanger = false;
  @Input() showJumpToPage = false;
  @Input() showTotalItems = false;
  @Input() simpleMode = false;

  currentPage: number = 0;
  pageNumbers: number = 1;
  changerValue?: number;

  /**
   * By default, the values are [10, 25, 50, 100]
   */
  changerValues: Array<number> = [10, 25, 50, 100, 250];

  ngOnChanges(changes: SimpleChanges): void {
    this.currentPage = this.pager.page;
    this.pageNumbers = this.pager.number_of_pages;
    this.changerValue = this.showChanger
      ? this.pager.items_per_page
      : undefined;
  }

  pageChange(page: number): void {
    this.currentPage = page;
    this.callback('new page: ' + page);
  }

  changerEvent(value: number): void {
    this.changerValue = value;
    this.callback('new items_per_page: ' + value);
  }
}
