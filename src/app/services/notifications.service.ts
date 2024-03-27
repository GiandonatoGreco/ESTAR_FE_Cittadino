import { Injectable } from '@angular/core';
import { NotificationI } from '../models/notifications';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface SystemNotificationI {
  id: string;
  payload: any;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notification?: NotificationI;

  private currentNotification = new BehaviorSubject<
    SystemNotificationI | undefined
  >(undefined);
  currentNotification$ = this.currentNotification.asObservable();
  setCurrentNotification(data?: SystemNotificationI) {
    this.currentNotification.next(data);
  }

  constructor(private http: HttpClient) {}

  showNotification = (id: string, payload: any) => {
    this.setCurrentNotification({ id, payload });
  };

  getLastNotification = (): Observable<NotificationI> => {
    const url = `https://jsonplaceholder.typicode.com/posts/2`;
    return this.http.get<NotificationI>(url);
  };
}
