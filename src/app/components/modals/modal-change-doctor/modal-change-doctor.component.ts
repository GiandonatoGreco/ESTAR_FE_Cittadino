import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ItModalComponent } from 'design-angular-kit';
import { routes as utilsRoutes } from '../../../../utils/routes';
import { DoctorsService } from 'services/doctors.service';

@Component({
  selector: 'app-modal-change-doctor',
  templateUrl: './modal-change-doctor.component.html',
  styleUrl: './modal-change-doctor.component.scss'
})
export class ModalChangeDoctorComponent implements AfterViewInit  {
  @ViewChild('modalChangeDoctor') modalChangeDoctor!: ItModalComponent;

  routes = utilsRoutes;
  response!: boolean

  constructor(
    private doctorService: DoctorsService
  ) {}

  ngAfterViewInit(): void {
    //this.modalChangeDoctor.toggle();
  }

  modalOpen(data: any) {
    this.response = data.response;
    this.modalChangeDoctor.toggle();
  }
}
