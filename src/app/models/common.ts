import { IconName } from 'design-angular-kit';

export interface BreadcrumbI {
  label: string;
  link?: string;
  icon?: IconName;
}

interface CustomTDI {
  type: 'link' | 'button';
  action: Function;
  label: string;
}
export interface TableRowI {
  [key: string]: number | string | CustomTDI;
}

export interface PagerI {
  total_items: number;
  page: number;
  items_per_page: number;
  number_of_pages: number;
}
