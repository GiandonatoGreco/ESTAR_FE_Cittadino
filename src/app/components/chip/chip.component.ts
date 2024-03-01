import { Component, Input } from '@angular/core';
import { ChipColor, IconName } from 'design-angular-kit';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
})
export class ChipComponent {
  @Input() chip: {
    label: string;
    color: ChipColor;
    icon?: IconName;
  } = {
    label: 'Label',
    color: 'primary',
    icon: undefined,
  };
  showChip = true;

  size: '' | 'lg' = 'lg';

  close(): void {
    this.showChip = false;
  }
}
