import { Component, Input } from '@angular/core';
import {
  ButtonColor,
  ButtonSize,
  ButtonType,
  IconColor,
  IconName,
} from 'design-angular-kit';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent {
  // parent properties
  @Input() btnText = '';
  @Input() disabled = false;
  @Input() itBtn: ButtonColor = 'primary';
  @Input() size: ButtonSize = 'sm';
  @Input() type: ButtonType = 'button';
  @Input() icon?: IconName;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() classes: string = '';

  // callback
  @Input() onClick: Function = () => {};

  getIconColor(): IconColor {
    if (this.itBtn.includes('outline')) {
      const iconColor = this.itBtn.replace('outline-', '');
      return iconColor as IconColor;
    }
    return 'white';
  }
}
