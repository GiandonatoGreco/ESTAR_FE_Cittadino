import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss',
})
export class ModalConfirmComponent {
  @Input() title!: string;
  @Input() description?: string;
  @Input() confirmLabel: string = 'Conferma';
  @Input() cancelLabel: string = 'Annulla';
}
