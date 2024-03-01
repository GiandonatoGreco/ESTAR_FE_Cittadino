import { Component, OnInit, ViewChild } from '@angular/core';
import { ItModalComponent } from 'design-angular-kit';
import { NotificationsService } from 'services/notifications.service';
import storage from '../../../../utils/storage';

@Component({
  selector: 'app-modal-notification',
  templateUrl: './modal-notification.component.html',
  styleUrl: './modal-notification.component.scss',
})
export default class ModalNotificationComponent implements OnInit {
  @ViewChild('modalNotification')
  modalNotification!: ItModalComponent;
  constructor(private notificationService: NotificationsService) {}

  title!: string;
  body!: string;

  private _id!: number;
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;

    // TMP: logica per decidere se mostrare ultima notifica
    const lastNotification = storage.read('readNotifications')?.value;
    if (this.id?.toString() !== lastNotification) {
      this.modalNotification.toggle();
    }
  }

  ngOnInit(): void {
    this.notificationService.getLastNotification().subscribe((data) => {
      // set title, body & id
      this.title = data.title;
      this.body = data.body;
      this.id = data.id;
    });
  }

  readNotification() {
    console.log('read', this.id);
    storage.write('readNotifications', this.id.toString());
  }
}
