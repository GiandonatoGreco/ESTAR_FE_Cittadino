import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { DocumentI } from 'models/documents';
import * as DocumentsData from '../json/documents.json';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) {}
  // env variables
  apiUrl = environment.apiUrl;
  useMock = environment.useMock;
  // mocks
  documentsDataMock = DocumentsData as { data: DocumentI[] };

  getDocumentsList = (): Observable<DocumentI[]> => {
    if (this.useMock) {
      return of(this.documentsDataMock.data).pipe(delay(100));
    }

    const url = `https://jsonplaceholder.typicode.com/users`; // TODO
    return this.http.get<DocumentI[]>(url);
  };
}
