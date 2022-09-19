import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {SkedTemplate} from 'src/app/core/model/sked-template';
import {GetAllSkedTemplatesAction} from 'src/app/core/store/skeds/skeds.action';
import {selectAllFilteredSkedTemplates} from 'src/app/core/store/skeds/skeds.selector';
import {TitleService} from '../../../core/page/title.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {selectActiveUserPrivileges} from '../../../core/store/active-user/active-user.selector';

@Component({
  selector: 'sked-templates-list',
  templateUrl: './sked-templates-list.component.html',
  styleUrls: ['./sked-templates-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedTemplatesListComponent implements OnInit, OnDestroy {
  public readonly activeUserPrivileges: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  public skedTemplates$: Observable<SkedTemplate[]>;
  public queries$: Observable<Params>;

  private readonly subscription: Subscription = new Subscription();

  get canEditChapters(): boolean {
    return this.activeUserPrivileges?.value?.includes('Can edit Chapters');
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store$: Store<{}>,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.setPageTitle('Sked Templates');

    this.skedTemplates$ = this.store$.pipe(select(selectAllFilteredSkedTemplates));
    this.queries$ = this.activatedRoute.queryParams;

    this.subscription.add(
      this.activatedRoute.queryParams.pipe(debounceTime(400), distinctUntilChanged()).subscribe(p => {
        if (p) {
          const {sort, sortDir, empty} = p;
          this.store$.dispatch(new GetAllSkedTemplatesAction({sort, sortDir, empty}));
        }
      })
    );

    this.subscription.add(
      this.store$.select(selectActiveUserPrivileges).subscribe(p => this.activeUserPrivileges.next(p))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onTemplateClick(id: string) {
    this.router.navigate([id], {relativeTo: this.activatedRoute});
  }

  public trackById(index: number, template: SkedTemplate) {
    return template.id;
  }
}
