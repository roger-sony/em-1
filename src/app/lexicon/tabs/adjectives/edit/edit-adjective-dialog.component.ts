import {ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {Adjective} from 'src/app/core/model/adjective';
import {convertAdjectFormToAdjective} from 'src/app/shared/utils/lexicon/adjectives/convert-adjective-form-to-adjective';
import {convertAdjectiveToAdjectiveForm} from 'src/app/shared/utils/lexicon/adjectives/convert-adjective-to-adjective-form';
import {AdjectiveForm} from './../../../../core/model/adjective-form';
import {selectAdjectivesMap} from './../../../../core/store/adjectives/adjectives.selector';

@Component({
  selector: 'edit-adjective-dialog',
  templateUrl: './edit-adjective-dialog.component.html',
  styleUrls: ['./edit-adjective-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditAdjectiveDialogComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  public adjectivesMap$: Observable<Record<string, Adjective>>;
  public adjective$: Observable<Adjective>;
  public id: string;

  public id$ = new BehaviorSubject<string>('');
  public formValue$ = new BehaviorSubject({} as AdjectiveForm);
  public valid$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    public dialog: MatDialogRef<EditAdjectiveDialogComponent, Adjective>,
    private store$: Store
  ) {
    this.id$.next(data.id);
  }

  ngOnInit() {
    this.adjectivesMap$ = this.store$.pipe(select(selectAdjectivesMap));
    this.adjective$ = this.observeAdjectiveId();

    this.subscription.add(this.subscribeToAdjective());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private subscribeToAdjective(): Subscription {
    return this.adjective$.subscribe(adjective => {
      this.formValue$.next(convertAdjectiveToAdjectiveForm(adjective));
    });
  }

  private observeAdjectiveId(): Observable<Adjective> {
    return combineLatest([this.id$, this.adjectivesMap$]).pipe(map(([id, adjectivesMap]) => adjectivesMap[id]));
  }

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
