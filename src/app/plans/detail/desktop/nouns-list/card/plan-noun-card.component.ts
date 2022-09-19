import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {DecisionTable} from '../../../../../core/model/decision-table';
import {OphCardComponent} from '../../../../../shared/design/oph-card/oph-card.component';
import {PlanConditionGroup} from '../util/plan-condition-group';

@Component({
  selector: 'plan-noun-card',
  templateUrl: './plan-noun-card.component.html',
  styleUrls: ['./plan-noun-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNounCardComponent implements OnChanges, AfterViewInit {
  @Input()
  public group: PlanConditionGroup;

  @Input()
  public index: number;

  @Input()
  public plan: DecisionTable;

  @Input()
  public editedGroup: string;

  @Input()
  public editedIndex: number;

  @Output()
  public cancelEditing = new EventEmitter();

  @ViewChild(OphCardComponent)
  public card: OphCardComponent;

  private initialized$ = new BehaviorSubject(false);

  public ngOnChanges(changes: SimpleChanges) {
    if ((changes.group || changes.editedGroup) && this.group?.name === this.editedGroup) {
      this.scrollIntoViewWhenInitialized();
    }
  }

  private scrollIntoViewWhenInitialized() {
    this.initialized$
      .pipe(
        filter(initialized => initialized),
        take(1)
      )
      .subscribe(() => this.card.element.nativeElement.scrollIntoView());
  }

  public ngAfterViewInit() {
    this.initialized$.next(true);
  }

  public onOverlayClick() {
    this.cancelEditing.emit();
  }
}
