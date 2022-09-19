import {Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {selectFilteredNounRuleTriggers} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.selector';
import {selectFilteredTaskRuleTriggers} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.selector';
import {selectFilteredTasks} from 'src/app/core/store/tasks/tasks.selector';
import {Task} from 'src/app/core/model/task';
import {NounRuleTrigger} from 'src/app/core/model/noun-rule-trigger';
import {TaskRuleTrigger} from 'src/app/core/model/task-rule-trigger';

@Component({
  selector: 'plans-list-mobile-tabs',
  templateUrl: './plans-list-mobile-tabs.component.html',
  styleUrls: ['./plans-list-mobile-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansListMobileTabsComponent implements OnInit {
  encapsulation: ViewEncapsulation.None;

  public selectedIndex: number;
  filteredNounRuleTriggers$: Observable<NounRuleTrigger[]>;
  filteredTaskRuleTriggers$: Observable<TaskRuleTrigger[]>;
  filteredTasks$: Observable<Task[]>;
  filteredSearchNumber$: Observable<number>;

  constructor(private router: Router, public activatedRoute: ActivatedRoute, private store$: Store<{}>) {}

  ngOnInit(): void {
    this.filteredNounRuleTriggers$ = this.store$.pipe(select(selectFilteredNounRuleTriggers));
    this.filteredTaskRuleTriggers$ = this.store$.pipe(select(selectFilteredTaskRuleTriggers));
    this.filteredTasks$ = this.store$.pipe(select(selectFilteredTasks));
    this.findSelectedIndex();
  }

  private findSelectedIndex() {
    this.selectedIndex = this.router.url === '/plans/search' ? 0 : 1;
  }

  tabChanged(event: MatTabChangeEvent): void {
    if (event.index === 0) {
      this.router.navigate(['plans', 'search'], {queryParamsHandling: 'preserve'});
    } else {
      this.router.navigate(['plans', 'search', 'other'], {queryParamsHandling: 'preserve'});
    }
  }
}
