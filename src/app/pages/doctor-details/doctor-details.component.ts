import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BreadcrumbI } from 'models/common';
import { DoctorI } from 'models/doctors';
import { DoctorsService } from 'services/doctors.service';
import { routes } from '../../../utils/routes';
import { NotificationsService } from 'services/notifications.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss',
})
export class DoctorDetailsComponent implements OnInit {
  id: string | null = null;
  docDetail?: DoctorI;

  crumbs: BreadcrumbI[] = [
    {
      link: '/' + routes.dashboard.path,
      label: routes.dashboard.title,
      icon: undefined,
    },
  ];

  //TODO mettere diretto dentro al dottore
  clinics = [
    {
      //TODO add coordinate
      address: 'Via Giuseppe Garibaldi, 30 - Pisa',
      availability: 'Lun: 9:00 - 13:00',
    },
    {
      address: 'Via Giuseppe Garibaldi, 30 - Pisa',
      availability: 'Lun: 9:00 - 13:00',
    },
    {
      address: 'Via Giuseppe Garibaldi, 30 - Pisa',
      availability: 'Lun: 9:00 - 13:00',
    },
    {
      address: 'Via Giuseppe Garibaldi, 30 - Pisa',
      availability: 'Lun: 9:00 - 13:00',
    },
  ];

  checkboxChecked: boolean = false;
  isCurrentDoctor: boolean = false; //TODO da rendere dinamico

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorsService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    //TODO rivedere logica. mettere chiamata getDoctorDetails
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {
        this.doctorService.getDoctorsList().subscribe((data) => {
          const details = data.find((d) => d.id.toString() === this.id);
          this.docDetail = details;
          this.crumbs.push({
            label: ` ${details?.name || ''}`,
            icon: undefined,
          });
        });
      }
    });

    if (!this.isCurrentDoctor) {
      this.crumbs.push({
        link: '/' + routes.doctors.path,
        label: routes.doctors.title,
        icon: undefined,
      });
    }
  }

  toggleButtonState(): void {
    this.checkboxChecked = !this.checkboxChecked;
  }

  changeDoctor(): void {
    this.doctorService.changeDoctor().subscribe(({ response }) => {
      this.notificationsService.showNotification('CHANGE_DOCTOR_NOTIFICATION', {
        status: response,
      });
    });
  }
}
