import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {DecisionTable, DecisionTableFact} from 'src/app/core/model/decision-table';
import {UpdateDecisionTableAction} from '../../../../../../core/store/decision-tables/decision-tables.action';
import {OphMenuComponent} from '../../../../../../shared/design/oph-menu/oph-menu.component';
import {PlanConditionsDeleteDialogComponent} from './delete-dialog/plan-conditions-delete-dialog.component';
import {PlanConditionGroup} from '../../util/plan-condition-group';
import {PlanConditionsNounDialogComponent} from './noun-dialog/plan-conditions-noun-dialog.component';

@Component({
  selector: 'plan-noun-card-menu',
  templateUrl: './plan-noun-card-menu.component.html',
  styleUrls: ['./plan-noun-card-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNounCardMenuComponent {
  @Input()
  plan: DecisionTable;

  @Input()
  index: number;

  @Input()
  group: PlanConditionGroup;

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  @ViewChild('menuButton')
  public menuButtonElement: ElementRef<HTMLButtonElement>;

  constructor(private dialog: MatDialog, private store$: Store<{}>) {}

  public onMenuClick() {
    this.menu.open();
  }

  public onChangeNounClick() {
    this.menu.close();
    const dialog = this.dialog.open(PlanConditionsNounDialogComponent, {
      backdropClass: 'oph-backdrop',
      data: {group: this.group},
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(value => {
      if (value && value !== this.group.name) {
        this.changeConditionsNoun(value);
      }
    });
  }

  private changeConditionsNoun(configName: string) {
    const rules = this.plan.rules?.map(rule => (rule.configName === this.group.name ? {...rule, configName} : rule));
    const decisionTable = {...this.plan, rules};
    this.updateDecisionTable(decisionTable);
  }

  public onDeleteClick() {
    this.menu.close();
    const dialog = this.dialog.open(PlanConditionsDeleteDialogComponent, {
      backdropClass: 'oph-backdrop',
      data: {global: this.group.global},
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteAllConditions();
      }
    });
  }

  public deleteAllConditions() {
    if (this.group.global) {
      this.deleteAllFacts(this.index);
    } else {
      this.deleteAllRules(this.index);
    }
  }

  private deleteAllFacts(index: number) {
    const facts: DecisionTableFact[] = [];
    const decisionTable = {...this.plan, facts};
    this.updateDecisionTable(decisionTable);
  }

  private deleteAllRules(index: number) {
    const unfilteredRules = [...this.plan.rules];
    const rules = unfilteredRules.filter(rule => rule.configName !== this.group.name);
    const decisionTable = {...this.plan, rules};
    this.updateDecisionTable(decisionTable);
  }

  private updateDecisionTable(decisionTable: DecisionTable) {
    this.store$.dispatch(
      new UpdateDecisionTableAction({
        decisionTable,
        onSuccess: () => {},
      })
    );
  }
}
