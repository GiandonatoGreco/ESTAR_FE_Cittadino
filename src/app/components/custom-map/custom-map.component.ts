import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { DoctorI } from 'models/doctors';
import { DoctorsService } from 'services/doctors.service';
import storage from '../../../utils/storage';
import { GeolocationService } from 'services/geolocation.service';

const provider = new OpenStreetMapProvider();

const searchControl = GeoSearchControl({
  provider: provider,
  notFoundMessage: 'Indirizzo non trovato',
  searchLabel: 'Cerca un indirizzo',
  showMarker: false,
});

const defaultIconOptions: {
  iconSize?: L.PointExpression;
  shadowSize?: L.PointExpression;
  iconAnchor?: L.PointExpression;
  popupAnchor?: L.PointExpression;
  tooltipAnchor?: L.PointExpression;
} = {
  iconSize: [25, 41],
  shadowSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
};

const iconDefault = L.icon({
  iconUrl: '/assets/img/availablePin.png',
  ...defaultIconOptions,
});
L.Marker.prototype.options.icon = iconDefault;

const activeIcon = L.icon({
  iconUrl: '/assets/img/activePin.png',
  ...defaultIconOptions,
});

@Component({
  selector: 'app-custom-map',
  templateUrl: './custom-map.component.html',
  styleUrl: './custom-map.component.scss',
})
export class CustomMapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() markers: DoctorI[] = [];
  leafletMarkers: L.Marker[] = [];

  private map!: L.Map;
  private initMap(): void {
    this.map = L.map('map', {
      center: [43.438781, 10.924118],
      zoom: 8,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);

    this.map.addControl(searchControl);
  }

  constructor(
    private geolocationService: GeolocationService,
    private doctorService: DoctorsService
  ) {}
  activeMarker?: number;

  getGeoLocation() {
    // update current position if user allows geolocation
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        this.map.panTo(
          new L.LatLng(position.coords.latitude, position.coords.longitude)
        );
      },
    });
  }

  ngOnInit(): void {
    this.getGeoLocation();

    // active marker
    this.doctorService.activeMarker$.subscribe((data) => {
      this.activeMarker = data;
      this.leafletMarkers?.forEach((m) => {
        if (m.options.title === data?.toString()) m?.setIcon(activeIcon);
        else m?.setIcon(iconDefault);
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.markers.forEach((m) => {
      // create marker
      const marker = L.marker([m.address.geo.lat, m.address.geo.lng], {
        title: m.id?.toString(),
      });
      // bind marker with popup
      marker.bindPopup(this.doctorService.displayPopup(m));

      // markers event listener
      marker.addEventListener('mouseover', () => {
        this.doctorService.setActiveMarker(m.id);
      });
      marker.addEventListener('mouseout', () => {
        this.doctorService.setActiveMarker(undefined);
      });
      // add to map
      marker.addTo(this.map);
      this.leafletMarkers.push(marker);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();

      const userLocation = storage.read('userLocation')?.value;
      if (userLocation) {
        // if location is saved on localStorage set center to userLocation
        const parsedUserLocation = JSON.parse(userLocation);
        this.map.panTo(
          new L.LatLng(parsedUserLocation?.lat, parsedUserLocation?.lng)
        );
      }

      this.map.on('click', function (e: L.LeafletMouseEvent) {
        const coord = e.latlng.toString().split(',');
        const lat = coord[0].split('(');
        const lng = coord[1].split(')');
        console.log('You clicked the map at: ' + lat[1] + ',' + lng[0]);
      });
    }, 0);
  }
}
