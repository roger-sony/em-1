import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  HostBinding,
  QueryList,
} from '@angular/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {OphInputDirective} from '../oph-input/oph-input.directive';
import {OphSelectComponent} from '../oph-select/oph-select.component';
import {OphErrorComponent} from './oph-error/oph-error.component';
import {OphLabelComponent} from './oph-label/oph-label.component';

@Component({
  selector: 'oph-form-field',
  templateUrl: './oph-form-field.component.html',
  styleUrls: ['./oph-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphFormFieldComponent implements AfterContentInit {
  @ContentChildren(OphErrorComponent)
  public errors: QueryList<OphErrorComponent>;

  @ContentChild(OphInputDirective)
  public input: OphInputDirective;

  @ContentChild(OphLabelComponent)
  public label: OphLabelComponent;

  @ContentChild(OphSelectComponent)
  public select: OphSelectComponent;

  @HostBinding('class.oph-form-field')
  public rootClass = true;

  public errors$: Observable<boolean>;
  public focused$: Observable<boolean>;

  public ngAfterContentInit() {
    this.errors$ = this.errors.changes.pipe(
      startWith(this.errors.toArray()),
      map(() => this.errors.length > 0)
    );

    if (this.input) {
      this.focused$ = this.input.focused$;

      if (this.label) {
        this.label.inputId = this.input.element.nativeElement.id;
      }
    }
  }
}
