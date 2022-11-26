import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { SeatTimeStateChange } from "./seat-time.classes";


@Injectable({
  providedIn: 'root'
})
export class SeatTimeService {

  private stateSource:BehaviorSubject<SeatTimeStateChange | null> = new BehaviorSubject<SeatTimeStateChange | null>(null);
  public state = this.stateSource.asObservable();

  constructor() { }
  updateState(change: SeatTimeStateChange | null) {
    this.stateSource.next(change);
  }
}
