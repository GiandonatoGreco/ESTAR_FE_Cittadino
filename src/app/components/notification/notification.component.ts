import { Component } from '@angular/core';
import { routes as utilsRoutes } from '../../../utils/routes';
import { DoctorsService } from 'services/doctors.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})

export class NotificationComponent {

  routes = utilsRoutes;
  response!: boolean

  constructor(
    private notificationsService: NotificationsService
    ) {}


  /*showNotification(message: string, type: string) {
    this.notificationsService.showNotification(message, type);
  }
  */

}