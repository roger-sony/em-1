import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Directive({
  selector: '[ophInput]',
})
export class OphInputDirective {
  @HostBinding('class.oph-input')
  public rootClass = true;

  public focused$ = new BehaviorSubject(false);

  constructor(public element: ElementRef<HTMLInputElement | HTMLTextAreaElement>) {}

  @HostListener('focus')
  public onFocus() {
    this.focused$.next(true);
  }

  @HostListener('blur')
  public onBlur() {
    this.focused$.next(false);
  }
}
