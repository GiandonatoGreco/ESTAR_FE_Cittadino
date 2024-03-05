import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { environment } from '../../environments/environment';
import * as DoctorsData from '../json/doctors.json';
import { DoctorI } from 'models/doctors';
import { routes } from '../../utils/routes';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  constructor(private http: HttpClient) {}
  // env variables
  apiUrl = environment.apiUrl;
  useMock = environment.useMock;
  // mocks
  doctorDataMock = DoctorsData;

  private activeMarker = new BehaviorSubject<number | undefined>(undefined);
  activeMarker$ = this.activeMarker.asObservable();

  setActiveMarker(data?: number) {
    // console.log('active', data);
    this.activeMarker.next(data);
  }

  getDoctorsList = (limit: string = '10000'): Observable<DoctorI[]> => {
    if (this.useMock) {
      return of(this.doctorDataMock.data).pipe(delay(100));
    }

    const url = `https://jsonplaceholder.typicode.com/users`;
    return this.http.get<DoctorI[]>(url);
  };

  getDoctorDetails = (id: number = 0): Observable<DoctorI> => {
    if (this.useMock) {
      return of(this.doctorDataMock.data[id]).pipe(delay(100));
    }

    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    return this.http.get<DoctorI>(url);
  };

  displayPopup(data: DoctorI): string {
    return `<div><a href="/${routes.doctors.path}/${data.id}">${data.name}</a><br/>
    ${data.address.city}, ${data.address.zipcode},<br/>
    ${data.phone}</div>`;
  }
}
