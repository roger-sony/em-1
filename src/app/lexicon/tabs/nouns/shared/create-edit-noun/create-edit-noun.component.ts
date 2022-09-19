import {Component, ChangeDetectionStrategy, Inject, ViewChildren, QueryList} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NounDto} from '../../../../../core/api/dto/noun.dto';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {AdjectivesApiService} from '../../../../../core/api/adjectives-api.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Adjective} from '../../../../../core/model/adjective';
import {MatDatepicker} from '@angular/material/datepicker';
import {Moment} from 'moment';

@Component({
  templateUrl: './create-edit-noun.component.html',
  styleUrls: ['./create-edit-noun.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateEditNounComponent {
  @ViewChildren('startDatepicker') public startDatePickerList: QueryList<MatDatepicker<Moment>>;

  public noun: NounDto | {name: string; active: boolean; adjectives: Adjective[]};
  public nameFocused: boolean = false;
  public filteredAdjectives: Observable<Adjective[]>;
  public selectedAdjective: Adjective;
  public selectedUoMs: (string | number)[] = [];
  public selectedValues: (string | number | Date)[] = [];
  public createBatch: boolean = false;
  public batchAmount: number = 1;
  public batchStart: number = 1;

  get isCreate(): boolean {
    return this.data?.action === 'create';
  }
  get isEdit(): boolean {
    return this.data?.action === 'edit';
  }
  get isClone(): boolean {
    return this.data?.action === 'clone';
  }
  get namePlaceholder(): string {
    return this.noun?.name || this.nameFocused ? null : 'Enter noun name...';
  }
  get canSave(): boolean {
    return (
      !!this.noun?.name &&
      !!this.noun.adjectives?.every((a, i) => {
        return a.name && (!!this.selectedValues[i] || !!this.selectedUoMs[i]);
      })
    );
  }
  get canAddAdjective(): boolean {
    const lastIndex = this.noun.adjectives?.length - 1 || 0;
    return !!this.noun && !!this.noun.name && !!this.noun.adjectives[lastIndex]?.name;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {action: 'create' | 'edit' | 'clone'; noun: NounDto},
    private dialogRef: MatDialogRef<CreateEditNounComponent>,
    private adjectivesService: AdjectivesApiService
  ) {
    this.filterAdjectives();
    if (this.isEdit || this.isClone) {
      this.noun = JSON.parse(JSON.stringify(data.noun));
      this.noun.adjectives.forEach((a, i) => {
        this.selectedValues[i] = a.type === 'date' ? new Date(a.value) : a.value;
        this.selectedUoMs[i] = a.unitOfMeasure as string;
      });
    } else {
      this.noun = {
        active: true,
        name: null,
        adjectives: [
          {
            name: '',
            numeric: true,
            options: null,
            updateable: false,
            value: null,
            unitOfMeasure: null,
            type: null,
            validation: '',
          },
        ],
      };
    }
  }

  public onDateChange(event: Moment, i: number) {
    this.selectedValues[i] = event?.format('YYYY-MM-DDTHH:mm') || null;
  }

  updateAdjectiveType(adjective: Adjective | Event, index: number) {
    this.noun.adjectives[index] = adjective as Adjective;

    if (Array.isArray((adjective as Adjective).unitOfMeasure) && (adjective as Adjective).unitOfMeasure.length === 1) {
      this.selectedUoMs[index] = (adjective as Adjective).unitOfMeasure[0];
    }
  }

  isArray(v: string | Array<string | number>) {
    return Array.isArray(v);
  }

  filterAdjectives(event: KeyboardEvent | null = null) {
    this.filteredAdjectives = this.adjectivesService.getAdjectives().pipe(
      map(data => {
        const query: string = (event?.target as HTMLInputElement)?.value || '';

        return this.filter(data, query);
      })
    );
  }

  removeAdjective(index: number) {
    this.noun.adjectives.splice(index, 1);
    this.selectedValues.splice(index, 1);
    this.selectedUoMs.splice(index, 1);
  }

  filter(values: Adjective[], query: string) {
    return values.filter(adjective => adjective?.name?.toLowerCase()?.includes(query));
  }

  onSaveClick() {
    this.dialogRef.close({
      noun: {
        ...this.noun,
        adjectives: JSON.parse(JSON.stringify(this.noun.adjectives))?.map((a: Adjective, i: number) => {
          a.value = `${this.selectedValues[i] || ''}`;
          a.unitOfMeasure = `${this.selectedUoMs[i] || ''}`;

          return a;
        }),
      },
      createBatch: this.createBatch,
      batchAmount: this.batchAmount,
      batchStart: this.batchStart,
    });
  }

  addAdjective() {
    this.noun.adjectives.push({
      name: null,
      unitOfMeasure: null,
      options: null,
      updateable: false,
      value: null,
      numeric: true,
      type: null,
      validation: '',
    });
  }

  drop(event: CdkDragDrop<unknown>) {
    moveItemInArray(this.noun.adjectives, event.previousIndex, event.currentIndex);
  }
}
