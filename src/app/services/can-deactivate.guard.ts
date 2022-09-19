import {Observable} from 'rxjs';
import {CanDeactivate} from '@angular/router';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
    if (component?.canDeactivate) {
      return component.canDeactivate();
    } else {
      return true;
    }
  }
}
