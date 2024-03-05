import { Component, OnInit } from '@angular/core';
import { IconName, ItNotificationService } from 'design-angular-kit';
import { BreadcrumbI, TableRowI } from 'models/common';
import { DoctorI, GeoI } from 'models/doctors';
import { DoctorsService } from 'services/doctors.service';
import { LoadingService } from 'services/loading.service';
import { routes } from '../../../utils/routes';

interface TabI {
  label: string;
  icon: IconName;
  content: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './change-doctor.component.html',
  styleUrl: './change-doctor.component.scss',
})
export class ChangeDoctorComponent implements OnInit {
  crumbs: BreadcrumbI[] = [
    {
      link: routes.dashboard.path,
      label: routes.dashboard.title,
    },
    {
      label: routes.doctors.title,
    },
  ];

  list: DoctorI[] = [];
  markers: GeoI[] = [];
  tabs: TabI[] = [
    {
      label: 'Mappa',
      icon: 'map-marker-circle',
      content: 'mapContent',
    },
    {
      label: 'Tabella',
      icon: 'list',
      content: 'tableContent',
    },
  ];
  tableRows: TableRowI[] = [];

  activeMarker?: number;

  constructor(
    public doctorService: DoctorsService,
    private loadingService: LoadingService,
    private readonly notificationService: ItNotificationService
  ) {}

  ngOnInit(): void {
    // get Doctors list
    this.doctorService.getDoctorsList().subscribe({
      next: (data) => {
        this.list = data;
        this.tableRows = data.map((item) => ({
          id: item.id,
          name: item.name,
          phone: item.phone,
          email: item.email,
          site: item.website,
          customCol: {
            type: 'button',
            label: 'Vedi',
            action: () => {},
          },
        }));
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

  setActiveMarker(id?: any): void {
    this.doctorService.setActiveMarker(id);
  }
}
