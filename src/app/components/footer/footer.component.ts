import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

    email: string = 'help.cse@regione.toscana.it@pec.gov.it';
    phoneNumber: string = ' 800 004 477';
    time: string = 'lun-ven 9:00 - 19:00, sab 9:00 - 13:00';
}
