import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { DoctorI } from 'models/doctors';
import { DoctorsService } from 'services/doctors.service';
import storage from '../../../utils/storage';
import { GeolocationService } from 'services/geolocation.service';
import { availableIcon, currentPositionIcon, getIconType } from './icons';

const provider = new OpenStreetMapProvider();

const searchControl = GeoSearchControl({
  provider: provider,
  notFoundMessage: 'Indirizzo non trovato',
  searchLabel: 'Cerca un indirizzo',
  showMarker: false,
});

L.Marker.prototype.options.icon = availableIcon;

@Component({
  selector: 'app-custom-map',
  templateUrl: './custom-map.component.html',
  styleUrl: './custom-map.component.scss',
})
export class CustomMapComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy
{
  @Input() markers: DoctorI[] = [];
  leafletMarkers: L.Marker[] = [];
  markerClusterGroup!: L.MarkerClusterGroup;
  markerClusterOptions!: L.MarkerClusterGroupOptions;
  userLocation?: string = storage.read('userLocation')?.value;

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

    // add search control
    searchControl.setPosition('topright');
    this.map.addControl(searchControl);
    this.map.zoomControl.setPosition('bottomright');

    // Creazione del MarkerClusterGroup
    this.markerClusterGroup = new L.MarkerClusterGroup();
    this.map.addLayer(this.markerClusterGroup);
  }

  constructor(
    private geolocationService: GeolocationService,
    private doctorService: DoctorsService
  ) {}
  oldMarkerId?: number;

  getGeoLocation() {
    // update current position if user allows geolocation
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        this.map.panTo(
          new L.LatLng(position.coords.latitude, position.coords.longitude)
        );
        const userMarker = L.marker(
          [position.coords.latitude, position.coords.longitude],
          {
            title: 'Tu sei qui',
            icon: currentPositionIcon,
          }
        );
        userMarker.addTo(this.map);
      },
    });
  }

  ngOnInit(): void {
    this.getGeoLocation();

    // active marker
    this.doctorService.activeMarker$.subscribe((data) => {
      let tempMarker: DoctorI | undefined;
      if (data) {
        // if data is defined use data as id
        tempMarker = this.markers.find((m) => m.id === data);
      } else {
        // else use oldMarkerId
        tempMarker = this.markers.find((m) => m.id === this.oldMarkerId);
      }
      // find marker to edit from markersList & set new icon
      const marker = this.leafletMarkers?.find(
        (m) => m.options.title === tempMarker?.id?.toString()
      );
      marker?.setIcon(getIconType(tempMarker?.available, !!data));
      // update oldMarkerId with new id
      this.oldMarkerId = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.markers.forEach((m) => {
      // create marker
      const marker = L.marker([m.address.geo.lat, m.address.geo.lng], {
        title: m.id?.toString(),
        icon: getIconType(m.available),
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
      // add to clusterGroup
      this.markerClusterGroup.addLayer(marker);
      // add to markers list: needed to show avtive marker
      this.leafletMarkers.push(marker);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();

      if (this.userLocation) {
        // if location is saved on localStorage set center to userLocation
        const parsedUserLocation = JSON.parse(this.userLocation);
        this.map.panTo(
          new L.LatLng(parsedUserLocation?.lat, parsedUserLocation?.lng)
        );
        const userMarker = L.marker(
          [parsedUserLocation?.lat, parsedUserLocation?.lng],
          {
            title: 'Tu sei qui',
            icon: currentPositionIcon,
          }
        );
        userMarker.addTo(this.map);
      }

      this.map.on('click', function (e: L.LeafletMouseEvent) {
        const coord = e.latlng.toString().split(',');
        const lat = coord[0].split('(');
        const lng = coord[1].split(')');
        console.log('You clicked the map at: ' + lat[1] + ',' + lng[0]);
      });
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  onResize(): void {
    if (this.map) {
      // force resize when listView is changed
      setTimeout(() => {
        this.map.invalidateSize();
      }, 0);
    }
  }

  goToMyPosition() {
    const parsedUserLocation = JSON.parse(this.userLocation || '');

    if (this.map && parsedUserLocation) {
      this.map.flyTo(
        new L.LatLng(parsedUserLocation.lat, parsedUserLocation.lng),
        15
      );
    }
  }
}
