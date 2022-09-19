import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class TaskDeleteConfirmationService {
  // initialized as empty object
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage(message: any) {
    this.messageSource.next(message);
  }
}
