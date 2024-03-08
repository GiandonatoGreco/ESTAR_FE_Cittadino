import { Component } from '@angular/core';
import { ItNotificationService } from 'design-angular-kit';
import { DoctorI } from 'models/doctors';
import { DoctorsService } from 'services/doctors.service';
import { LoadingService } from 'services/loading.service';
import { routes as utilsRoutes } from '../../../utils/routes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  routes = utilsRoutes;
  name = 'Gloria';
  gender: 'm' | 'f' = 'f';

  currentDoctor: DoctorI = {
    id: 0,
    name: '',
    username: '',
    email: '',
    available: 'yes',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: 0,
        lng: 0,
      },
    },
    phone: '',
    website: '',
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  };

  constructor(
    public doctorService: DoctorsService,
    private loadingService: LoadingService,
    private readonly notificationService: ItNotificationService
  ) {}

  ngOnInit(): void {
    this.loadingService.showLoading();
    this.doctorService.getDoctorDetails(2).subscribe({
      next: (data) => {
        this.currentDoctor = data;
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
  }
}
