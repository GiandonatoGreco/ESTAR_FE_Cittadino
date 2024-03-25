import { Component, OnInit, ViewChild } from '@angular/core';
import { IconName, ItNotificationService } from 'design-angular-kit';
import { BreadcrumbI } from 'models/common';
import { DoctorI, GeoI } from 'models/doctors';
import { DoctorsService } from 'services/doctors.service';
import { routes as utilsRoutes } from '../../../utils/routes';
import { CustomMapComponent } from 'components/custom-map/custom-map.component';
import storage from '../../../utils/storage';

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
  @ViewChild(CustomMapComponent) mapComponent!: CustomMapComponent;
  routes = utilsRoutes;
  crumbs: BreadcrumbI[] = [
    {
      link: utilsRoutes.dashboard.path,
      label: utilsRoutes.dashboard.title,
    },
    {
      label: utilsRoutes.doctors.title,
    },
  ];

  list: DoctorI[] = [];
  markers: GeoI[] = [];
  activeMarker?: number;
  currentSight!: 'map' | 'table';
  showList = true;
  orderByItems = [
    { text: 'Distanza', value: 'distance' },
    { text: 'A - Z', value: 'alphabetical' },
  ];
  onChangeOrder(v: string) {
    console.log('order_by', v);
  }

  // page sight
  sightToggle(): void {
    if (this.currentSight === 'map') this.currentSight = 'table';
    else this.currentSight = 'map';
    storage.write('changeDoctorSight', this.currentSight, 'sessionStorage');
    this.mapComponent?.onResize();
  }
  listToggle(): void {
    this.showList = !this.showList;
    this.mapComponent?.onResize();
  }

  constructor(
    private doctorService: DoctorsService,
    private readonly notificationService: ItNotificationService
  ) {}

  ngOnInit(): void {
    this.currentSight = storage.read('changeDoctorSight')?.value || 'map';
    // get Doctors list
    this.doctorService.getDoctorsList().subscribe({
      next: (data) => {
        this.list = data;
      }, // nextHandler
      error: (error) => {
        console.log('Error:', error);
        this.notificationService.error('Notifica Errore', error?.message);
      }, // errorHandler
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
