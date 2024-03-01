import { Injectable } from '@angular/core';
import { NotificationI } from '../models/notifications';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notification?: NotificationI;
  constructor(private http: HttpClient) {}

  getLastNotification = (): Observable<NotificationI> => {
    const url = `https://jsonplaceholder.typicode.com/posts/2`;
    return this.http.get<NotificationI>(url);
  };
}
