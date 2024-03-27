import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() type!: string;
  @Input() size: number | string = 24;
  @Input() fill = '#9C0769';
  @Input() classes = '';
}
