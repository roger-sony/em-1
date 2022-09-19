import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as moment from 'moment';
import {CHAPTER_COLORS} from './chapter-colors';
import {ChapterForm} from 'src/app/core/model/form/chapter-form';
import {Chapter} from 'src/app/core/model/chapter';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterFormComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('nameInput')
  public nameInput: ElementRef<HTMLInputElement>;

  @Input()
  public chapter: Chapter;

  @Input()
  public usedColors: string[];

  @Input()
  public value: ChapterForm;

  @Output()
  public valueChange = new EventEmitter<ChapterForm>();

  @Output()
  public validityChange = new EventEmitter<boolean>();

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    color: new FormControl(null),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    progress: new FormControl(),
    plot: new FormControl(''),
    description: new FormControl(''),
  });

  public showPlotHint: boolean;
  public showDescriptionHint: boolean;
  public readonly today = moment.utc().startOf('day');
  private nameCharacterMax: number = 80;
  private characterMax: number = 400;

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(this.subscribeToFormChanges());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chapter && this.chapter) {
      this.fillInForm(this.chapter);
    }
    if (changes.value && this.value) {
      this.fillInForm(this.value);
    }
    if (changes.usedColors && this.usedColors) {
      const color = CHAPTER_COLORS.find(c => !this.usedColors.includes(c));
      this.colorControl.setValue(color);
    }
  }

  private subscribeToFormChanges(): Subscription {
    return this.form.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(() => {
        this.valueChange.emit(this.form.value);
        this.validityChange.emit(this.form.valid);
      });
  }

  public fillInForm(value: Chapter | ChapterForm) {
    this.form.setValue({
      name: value.name,
      color: value.color || null,
      startDate: value.startDate,
      endDate: value.endDate,
      progress: value.progress,
      plot: value.plot,
      description: value.description,
    });
  }

  public ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
  }

  public formatLabel(value: number) {
    return `${value}%`;
  }

  public onNameKeydown(event: KeyboardEvent) {
    if (
      this.form.value.name.split('').length > this.nameCharacterMax &&
      event.code !== 'Delete' &&
      event.code !== 'Backspace'
    ) {
      event.preventDefault();
    }
  }

  public onPlotKeydown(event: KeyboardEvent) {
    if (
      this.form.value.plot.split('').length > this.characterMax &&
      event.code !== 'Delete' &&
      event.code !== 'Backspace'
    ) {
      event.preventDefault();
    }
  }

  public onDescriptionKeydown(event: KeyboardEvent) {
    if (
      this.form.value.description.split('').length > this.characterMax &&
      event.code !== 'Delete' &&
      event.code !== 'Backspace'
    ) {
      event.preventDefault();
    }
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public get colorControl(): AbstractControl {
    return this.form.get('color');
  }
}
