import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TaskForm} from 'src/app/core/model/form/task-form';
import {Paragraph} from 'src/app/core/model/paragraph';

@Component({
  selector: 'task-detail-toolbar',
  templateUrl: './task-detail-toolbar.component.html',
  styleUrls: ['./task-detail-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailToolbarComponent implements OnChanges, AfterViewInit {
  @Input() public paragraph: Paragraph;
  @Input() public taskForm: TaskForm;
  @Input() public canSave: boolean;
  @Input() public canEdit: boolean;
  @Input() public saving: boolean;
  @Input() public taskNames: string[];

  @Output() public back = new EventEmitter();
  @Output() public save = new EventEmitter();
  @Output() public valueChange = new EventEmitter<string>();

  @ViewChild('hiddenText') public hiddenText: ElementRef<HTMLElement>;

  public hiddenTextWidth: number;
  public invalid$ = new BehaviorSubject<boolean>(false);
  public taskNameUsed$ = new BehaviorSubject<boolean>(false);

  ngOnChanges(changes: SimpleChanges) {
    if (changes.paragraph && this.paragraph && this.hiddenText) {
      this.hiddenTextWidth = this.hiddenText.nativeElement.clientWidth || 200;
    }
  }

  ngAfterViewInit() {
    this.hiddenTextWidth = this.hiddenText.nativeElement.clientWidth || 200;
  }

  public onSaveClick() {
    this.save.emit();
  }

  public onNameInput(value: string) {
    value = value.trim();
    this.valueChange.emit(value);
    this.invalid$.next(!value);
    const nameUsed =
      this.paragraph?.name?.toLowerCase() === value?.toLowerCase()
        ? false
        : this.taskNames.includes(value.toLowerCase());
    this.taskNameUsed$.next(nameUsed);
  }
}
