import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BreadcrumbI } from 'models/common';
import { DoctorI, clinicsI } from 'models/doctors';
import { DoctorsService } from 'services/doctors.service';
import { routes } from '../../../utils/routes';
import { ModalChangeDoctorComponent } from 'components/modals/modal-change-doctor/modal-change-doctor.component';
import { LoadingService } from 'services/loading.service';
import { ItNotificationService } from 'design-angular-kit';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss',
})
export class DoctorDetailsComponent implements OnInit {
  @ViewChild(ModalChangeDoctorComponent) modalChangeDoctor!: ModalChangeDoctorComponent;

  id: number | null = null;
  docDetail?: DoctorI;
  //clinics: clinicsI; TODO serve o stampo diretto da html?
  activeMarker?: number;

  crumbs: BreadcrumbI[] = [
    {
      link: '/' + routes.dashboard.path,
      label: routes.dashboard.title,
      icon: undefined,
    }
  ];

  checkboxChecked: boolean = false;
  isCurrentDoctor: boolean = false; //TODO da rendere dinamico

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private doctorService: DoctorsService,
    private readonly notificationService: ItNotificationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = parseInt(params.get('id') ?? '-1', 10);
      if (this.id !== -1) {
        /*this.doctorService.getDoctorDetails(this.id).subscribe((data) => {
          this.docDetail = data;
          this.crumbs.push({
            label: `Dettaglio ${data?.name || ''}`,
            icon: undefined,
          });
        });*/

        this.loadingService.showLoading();
        this.doctorService.getDoctorDetails(this.id).subscribe({
          next: (data) => {
            this.docDetail = data;
          }, // nextHandler
          error: (error) => {
            console.log('Error:', error);
            this.notificationService.error('Notifica Errore', error?.message);
            this.loadingService.hideLoading();
          }, // errorHandler
          complete: () => {
            this.loadingService.hideLoading();
          }, // completeHandler
        });

        // subscribe to activeMarker
        this.doctorService.activeMarker$.subscribe(
          (data) => (this.activeMarker = data)
        );
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

  changeDoctor() {
    this.doctorService.changeDoctor().subscribe((data) => {
        this.modalChangeDoctor.modalOpen(data);
    });
  }
}
