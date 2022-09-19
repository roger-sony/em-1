import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, take, withLatestFrom} from 'rxjs/operators';
import {selectFieldValues} from '../../../../../../../core/store/inventory/inventory.selector';
import {OphInputDirective} from '../../../../../../../shared/design/oph-input/oph-input.directive';
import {PlanConditionGroup} from '../../../util/plan-condition-group';

@Component({
  selector: 'plan-conditions-noun-dialog',
  templateUrl: './plan-conditions-noun-dialog.component.html',
  styleUrls: ['./plan-conditions-noun-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanConditionsNounDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(OphInputDirective)
  public input: OphInputDirective;

  public names$: Observable<string[]>;
  public filteredNames$: Observable<string[]>;
  public submitDisabled$: Observable<boolean>;

  private value$ = new BehaviorSubject('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {group: PlanConditionGroup},
    private dialog: MatDialogRef<PlanConditionsNounDialogComponent, string>,
    private store$: Store<{}>
  ) {}

  public ngOnInit(): void {
    this.names$ = this.observeNames();
    this.filteredNames$ = this.observeFilteredNames();
    this.submitDisabled$ = this.observeSubmitDisabled();
  }

  private observeNames(): Observable<string[]> {
    return this.store$.pipe(
      select(selectFieldValues),
      map(fieldValues => fieldValues?.subcategory.filter(subcategory => subcategory !== this.data?.group?.name))
    );
  }

  private observeFilteredNames(): Observable<string[]> {
    return combineLatest([this.names$, this.value$]).pipe(
      map(([names, value]) => {
        const lowerCaseValue = value?.toLowerCase();
        return names.filter(name => name?.toLowerCase().includes(lowerCaseValue));
      })
    );
  }

  private observeSubmitDisabled(): Observable<boolean> {
    return this.value$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      withLatestFrom(this.names$),
      map(([value, names]) => !names.find(name => name === value))
    );
  }

  public ngAfterViewInit() {
    setTimeout(() => this.input?.element?.nativeElement?.focus(), 500);
  }

  public onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value$.next(input.value.trim());
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.value$.next(event.option.value);
  }

  public onSubmit() {
    this.submitDisabled$.pipe(take(1)).subscribe(submitDisabled => {
      if (!submitDisabled) {
        this.dialog.close(this.value$.getValue());
      }
    });
  }

  public trackByNounName(index: number, name: string) {
    return name;
  }
}
