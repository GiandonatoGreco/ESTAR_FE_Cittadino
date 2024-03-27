import { Injectable } from '@angular/core';
import { NotificationI } from '../models/notifications';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationComponent } from '../components/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notification?: NotificationI;


  constructor(
    private http: HttpClient,
    
    ) {}

  
  showNotification = (data:any, message: string) => {

  }

  getLastNotification = (): Observable<NotificationI> => {
    const url = `https://jsonplaceholder.typicode.com/posts/2`;
    return this.http.get<NotificationI>(url);
  };
}

