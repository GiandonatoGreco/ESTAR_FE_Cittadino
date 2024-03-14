import { Component } from '@angular/core';
import { NotificationPosition } from 'design-angular-kit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ESTAR - Cittadino';
  notificationPosition = NotificationPosition.Top;
}
