import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { environment } from '../../environments/environment';
import * as FaqData from '../json/faq.json';
import { FaqI } from 'models/faq';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  constructor(private http: HttpClient) {}
  // env variables
  apiUrl = environment.apiUrl;
  useMock = environment.useMock;
  // mocks
  faqDataMock = FaqData as { data: FaqI[] };

  private activeMarker = new BehaviorSubject<number | undefined>(undefined);
  activeMarker$ = this.activeMarker.asObservable();

  setActiveMarker(data?: number) {
    // console.log('active', data);
    this.activeMarker.next(data);
  }


  getFaqList = (numberOfFaq: number = -1): Observable<FaqI[]> => {
    if (this.useMock) { //chiamata con Mock 
      return of(this.faqDataMock.data).pipe(
        map(response => this.faqDataMock.data.slice(0, numberOfFaq === -1 ? undefined : numberOfFaq))
      );
    }

    const url = ``; //chiamata con endpoint fittizio
    return this.http.get<FaqI[]>(url).pipe(
      map(response => this.faqDataMock.data.slice(0, numberOfFaq === -1 ? undefined : numberOfFaq))
    );
  };
}

