import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerStateSource = new BehaviorSubject<boolean>(false);
  public showSpinner = this.spinnerStateSource.asObservable();

  constructor() {}

  public show() {
    setTimeout(() => this.spinnerStateSource.next(true));
  }

  public hide() {
    setTimeout(() => this.spinnerStateSource.next(false));
  }
}
