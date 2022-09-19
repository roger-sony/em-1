import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {PlanCondition} from 'src/app/core/model/plan-condition';
import {UpdateDecisionTableAction} from 'src/app/core/store/decision-tables/decision-tables.action';
import {selectDecisionTableByIdFromUrl} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {PlanDialogService} from 'src/app/dialog/plan-dialog.service';
import {MessageService} from 'src/app/services/message.service';
import {OphMenuComponent} from 'src/app/shared/design/oph-menu/oph-menu.component';
import {PlanDetailConditionDeleteDialogComponent} from './condition-delete-dialog/plan-detail-condition-delete-dialog.component';

@Component({
  selector: 'plan-detail-collapsible-list-item-menu',
  templateUrl: './plan-detail-collapsible-list-item-menu.component.html',
  styleUrls: ['./plan-detail-collapsible-list-item-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailCollapsibleListItemMenuComponent implements OnInit {
  @Input()
  public option: PlanCondition;

  public activePlan$: Observable<DecisionTable>;

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  @ViewChild('menuButton')
  public menuButtonElement: ElementRef<HTMLButtonElement>;

  constructor(
    private messageService: MessageService,
    private dialog: MatDialog,
    private planDialogService: PlanDialogService,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.activePlan$ = this.store$.pipe(select(selectDecisionTableByIdFromUrl));
  }

  public onMenuClick() {
    this.menu.open();
  }

  public onEditClick() {
    this.menu.close();
    this.planDialogService.openEditPlanConditionDialog(this.option.id);
  }

  public onDeleteClick() {
    this.menu.close();
    const dialog = this.dialog.open(PlanDetailConditionDeleteDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.activePlan$.pipe(take(1)).subscribe(plan => {
          const tableRules = [...plan.newTableRules];
          tableRules.splice(tableRules.indexOf(tableRules.find(rule => rule.id === this.option.id)), 1);
          const decisionTable = {...plan, newTableRules: tableRules};

          this.store$.dispatch(
            new UpdateDecisionTableAction({
              decisionTable,
              onSuccess: () => this.onDeleteConditionSuccess(),
              onFailure: () => this.onDeleteConditionFailure(),
            })
          );
        });
      }
    });
  }

  public onDeleteConditionSuccess() {
    this.messageService.add('Success! Condition has been deleted.');
  }

  public onDeleteConditionFailure() {
    this.messageService.add('Error! There was a problem deleting the Condition.');
  }
}
