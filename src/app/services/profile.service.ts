import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { environment } from '../../environments/environment';
import * as ProfileData from '../json/profile.json';
import { ProfileI } from 'models/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}
  // env variables
  apiUrl = environment.apiUrl;
  useMock = environment.useMock;
  // mocks
  profileDataMock: ProfileI = ProfileData.data;

  getProfileDetails = (): Observable<ProfileI> => {
    if (this.useMock) {
      return of(this.profileDataMock).pipe(delay(100));
    }

    const url = ``; // Chiamata con endpoint fittizio
    return this.http.get<ProfileI>(url);
  };
}
