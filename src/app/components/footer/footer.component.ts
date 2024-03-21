import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

    email: string = 'help.cse@regione.toscana.it';
    phoneNumber: string = ' 800 004 477';
    time: string = 'Lun-Ven: 9:00 - 19:00, Sab: 9:00 - 13:00';
}
