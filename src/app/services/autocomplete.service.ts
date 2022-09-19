import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  private messageSource = new BehaviorSubject({index: null, blur: false});
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage(message: any) {
    this.messageSource.next(message);
  }
}
