import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';
import {Moment} from 'moment';
import {Observable} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {CadenceEndFormControl} from './cadence-end-form-control';
import {CadenceEndType} from '../../../../../core/model/form/cadence-end-type';

@Component({
  selector: 'cadence-end-form',
  templateUrl: './cadence-end-form.component.html',
  styleUrls: ['./cadence-end-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadenceEndFormComponent implements OnInit {
  @Input()
  public startDate: Moment;

  @Input()
  public form: FormGroup;

  @Input()
  public disabled: boolean;

  public readonly control = CadenceEndFormControl;
  public readonly endType = CadenceEndType;
  public readonly endTypes = Object.values(CadenceEndType);

  public endTypeValue$: Observable<CadenceEndType>;

  public ngOnInit(): void {
    this.endTypeValue$ = this.endTypeControl.valueChanges.pipe(startWith(this.endTypeControl.value));
  }

  public get endTypeControl(): AbstractControl {
    return this.form.get(CadenceEndFormControl.EndType);
  }
}
