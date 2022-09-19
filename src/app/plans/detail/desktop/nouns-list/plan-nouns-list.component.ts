import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DecisionTable} from '../../../../core/model/decision-table';
import {selectRouterParam} from '../../../../core/store/router/router.selector';
import {createGlobalConditionGroup, GLOBAL_CONDITION_NAME} from './util/create-global-condition-group';
import {createNounConditionGroups} from './util/create-noun-condition-groups';
import {PlanConditionGroup} from './util/plan-condition-group';

// tslint:disable-next-line:no-any
declare let ResizeObserver: any;

@Component({
  selector: 'plan-nouns-list',
  templateUrl: './plan-nouns-list.component.html',
  styleUrls: ['./plan-nouns-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNounsListComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  public plan: DecisionTable;

  @Input()
  public search: string;

  @Input()
  public panelOpen: boolean;

  private plan$ = new BehaviorSubject<DecisionTable>(null);
  private search$ = new BehaviorSubject<string>('');

  public editedGroup$: Observable<string>;
  public editedIndex$: Observable<number>;

  public groups$: Observable<PlanConditionGroup[]>;
  public layoutClass$: Observable<string>;

  // tslint:disable-next-line:no-any
  private resizeObserver: any; // type has not been added to TypeScript yet
  private width$ = new BehaviorSubject(0);

  constructor(
    private activatedRoute: ActivatedRoute,
    private element: ElementRef<HTMLElement>,
    private router: Router,
    private store$: Store<{}>
  ) {}

  public ngOnInit(): void {
    this.editedGroup$ = this.store$.pipe(select(selectRouterParam('editedGroup')));
    this.editedIndex$ = this.store$.pipe(
      select(selectRouterParam('editedIndex')),
      map(editedIndex => Number(editedIndex))
    );

    this.groups$ = this.observeGroups();

    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => this.onElementResize());
    }
    this.layoutClass$ = this.observeLayoutClass();
  }

  private observeGroups(): Observable<PlanConditionGroup[]> {
    return combineLatest([this.plan$, this.search$, this.editedGroup$, this.editedIndex$]).pipe(
      map(([plan, search, editedGroup]) => {
        if (plan) {
          const globalGroup = createGlobalConditionGroup(plan, editedGroup === GLOBAL_CONDITION_NAME);
          return (globalGroup.facts.length || globalGroup.adding ? [globalGroup] : [])
            .concat(createNounConditionGroups(plan, editedGroup))
            .filter(group => !search || group.adding || group.name.toLowerCase().includes(search.toLowerCase()));
        }
      })
    );
  }

  private observeLayoutClass(): Observable<string> {
    return combineLatest([this.groups$, this.width$]).pipe(
      map(([groups, width]) => ((groups?.length || 0) < width / 336 ? 'grid-layout' : 'masonry-layout'))
    );
  }

  private onElementResize() {
    this.width$.next(this.element.nativeElement.clientWidth);
  }

  public ngAfterViewInit() {
    if (this.resizeObserver) {
      this.resizeObserver.observe(this.element.nativeElement);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.plan && this.plan) {
      this.plan$.next(this.plan);
    }
    if (changes.search) {
      this.search$.next(this.search);
    }
  }

  public onCancelEditing() {
    this.router.navigate([{}], {queryParamsHandling: 'merge', relativeTo: this.activatedRoute});
  }

  public trackByGroupName(index: number, group: PlanConditionGroup): string {
    return group.name;
  }
}
