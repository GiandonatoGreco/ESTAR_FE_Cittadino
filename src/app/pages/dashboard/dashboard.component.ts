import { Component } from '@angular/core';
import { ItNotificationService } from 'design-angular-kit';
import { DoctorI } from 'models/doctors';
import { DoctorsService } from 'services/doctors.service';
import { LoadingService } from 'services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  name = 'Giulia';
  gender: 'm' | 'f' = 'f';

  currentDoctor!: DoctorI;

  constructor(
    public doctorService: DoctorsService,
    private loadingService: LoadingService,
    private readonly notificationService: ItNotificationService
  ) {}

  ngOnInit(): void {
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
