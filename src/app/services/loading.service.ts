import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingSubject = new BehaviorSubject<number>(0);
  loading$ = this.loadingSubject.asObservable();

  showLoading() {
    this.loadingSubject.next(this.loadingSubject.value + 1);
  }

  hideLoading() {
    this.loadingSubject.next(this.loadingSubject.value - 1);
  }
}
