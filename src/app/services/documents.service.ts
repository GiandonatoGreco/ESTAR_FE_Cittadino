import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { DocumentsGetI } from 'models/documents';
import * as DocumentsData from '../json/documents.json';
import * as SuccessData from '../json/success.json';
import { SuccessResponseI } from 'models/common';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) {}
  // env variables
  apiUrl = environment.apiUrl;
  useMock = environment.useMock;
  // mocks
  documentsDataMock: DocumentsGetI = DocumentsData;
  deleteDocumentMock = SuccessData;

  private _selectedDocument!: string;
  public get selectedDocument() {
    return this._selectedDocument;
  }
  public set selectedDocument(value) {
    this._selectedDocument = value;
  }

  getDocumentsList = (): Observable<DocumentsGetI> => {
    if (this.useMock) {
      return of(this.documentsDataMock).pipe(delay(100));
    }

    const url = `https://jsonplaceholder.typicode.com/users`; // TODO
    return this.http.get<DocumentsGetI>(url);
  };

  deleteDocument = (): Observable<SuccessResponseI> => {
    if (this.useMock) {
      return of(this.deleteDocumentMock).pipe(delay(100));
    }

    const url = `https://___/delete/${this.selectedDocument}`; // TODO
    return this.http.get<SuccessResponseI>(url);
  };
}
