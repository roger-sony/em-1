import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, Observable} from 'rxjs';
import {Adjective} from 'src/app/core/model/adjective';
import {convertAdjectFormToAdjective} from 'src/app/shared/utils/lexicon/adjectives/convert-adjective-form-to-adjective';
import {AdjectiveForm} from './../../../../core/model/adjective-form';

@Component({
  selector: 'new-adjective-dialog',
  templateUrl: './new-adjective-dialog.component.html',
  styleUrls: ['./new-adjective-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAdjectiveDialogComponent {
  public adjective$: Observable<Adjective>;

  public formValue$ = new BehaviorSubject({} as AdjectiveForm);
  public valid$ = new BehaviorSubject<boolean>(false);

  constructor(public dialog: MatDialogRef<NewAdjectiveDialogComponent, Adjective>) {}

  public onSave() {
    const adjectiveDto = convertAdjectFormToAdjective(this.formValue$.value);
    this.dialog.close(adjectiveDto);
  }

  public onFormChange(formValue: AdjectiveForm) {
    this.formValue$.next(formValue);
    this.valid$.next(this.checkValidity(formValue));
  }

  private checkValidity(form: AdjectiveForm): boolean {
    return !!(form.name && form.type && this.checkSpecificValidity(form));
  }

  private checkSpecificValidity(form: AdjectiveForm): boolean {
    switch (form.type) {
      case 'date':
        return true;
      case 'text':
        return true;
      case 'checkbox':
        return true;
      default:
        return !!form.options?.length;
    }
  }
}
