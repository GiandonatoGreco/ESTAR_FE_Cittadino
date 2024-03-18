import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'services/geolocation.service';
import storage from '../../utils/storage';

@Component({
  selector: 'app-private-site',
  templateUrl: './private-site.component.html',
  styleUrl: './private-site.component.scss',
})
export class PrivateSiteComponent implements OnInit {
  constructor(private geolocationService: GeolocationService) {}

  getGeoLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        const userLocation = JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        // save userLocation to localStorage --> faster loading when user opens a map
        storage.write('userLocation', userLocation);
      },
      error: (error) => {
        // if user denies, clear from localStorage
        storage.clearKey('userLocation');
      },
    });
  }

  ngOnInit(): void {
    this.getGeoLocation();
  }
}
