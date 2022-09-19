import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class AutocompleteNounFilterService {
  private messageSource = new BehaviorSubject({input: null, index: null});
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage(message: any) {
    this.messageSource.next(message);
  }
}
