import { Component, OnInit } from '@angular/core';
import { routes } from '../../../utils/routes';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit {
  response!: boolean;
  notificationId?: string;
  routes = routes;

  constructor(
    private notificationsService: NotificationsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.notificationsService.currentNotification$.subscribe((data) => {
      this.notificationId = data?.id;
      this.response = data?.payload?.status;
    });
  }

  closeNotification() {
    this.notificationsService.setCurrentNotification(undefined);
  }

  goToAndClose(url: string) {
    this.router.navigate(['/', url]);
    this.closeNotification();
  }
}
