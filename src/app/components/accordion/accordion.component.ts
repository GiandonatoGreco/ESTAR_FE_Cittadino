import { Component, Input } from '@angular/core';

export type AccordionItem = {
  title: string;
  text: string;
};

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  @Input() accordionItems: AccordionItem[] = [];
  @Input() collapse = true;
}
