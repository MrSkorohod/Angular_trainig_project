import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _spinnerSubject$ = new BehaviorSubject<boolean>(false);

  constructor() { }

  show(): void {
    this._spinnerSubject$.next(true);
  }

  hide(): void {
    this._spinnerSubject$.next(false);
  }

  getValue(): Observable<boolean> {
    return this._spinnerSubject$.asObservable();
  }
}
