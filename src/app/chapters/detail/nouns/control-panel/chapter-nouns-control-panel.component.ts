import {Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges} from '@angular/core';
import {Observable, BehaviorSubject, combineLatest} from 'rxjs';
import {AddMenuOption} from 'src/app/shared/desktop/add-menu/add-menu-option';
import {ActivatedRoute, Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {selectAllInventoryItems} from 'src/app/core/store/inventory/inventory.selector';
import {map} from 'rxjs/operators';
import {AddInventoryItemToChapterAction} from 'src/app/core/store/inventory/inventory.action';
import {GetSingleChapterAction, GetChapterNounsAction} from 'src/app/core/store/chapters/chapters.action';

@Component({
  selector: 'chapter-nouns-control-panel',
  templateUrl: './chapter-nouns-control-panel.component.html',
  styleUrls: ['./chapter-nouns-control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterNounsControlPanelComponent implements OnInit, OnChanges {
  @Input()
  public chapterId: string;

  public options$: Observable<AddMenuOption[]>;

  private chapterId$ = new BehaviorSubject('');

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.options$ = this.observeAddMenuOptions();
  }

  private observeAddMenuOptions(): Observable<AddMenuOption[]> {
    return combineLatest([this.store$.pipe(select(selectAllInventoryItems)), this.chapterId$]).pipe(
      map(([nouns, chapterId]) =>
        nouns
          .filter(noun => !noun.chapterIds.includes(chapterId))
          .map(noun => ({
            value: noun.id,
            displayValue: noun.subcategory,
          }))
      )
    );
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.chapterId && this.chapterId) {
      this.chapterId$.next(this.chapterId);
    }
  }

  public onAdd(option: AddMenuOption) {
    this.store$.dispatch(
      new AddInventoryItemToChapterAction({
        chapterId: this.chapterId,
        inventoryItemId: option.value,
        onSuccess: () => this.onAddToChapterSuccess(),
      })
    );
  }

  public onAddToChapterSuccess() {
    this.store$.dispatch(new GetSingleChapterAction({chapterId: this.chapterId}));
    this.store$.dispatch(new GetChapterNounsAction({chapterId: this.chapterId}));
  }

  public onCreate() {
    // TODO use dialog once the new design of task pages is available
    const returnTo = this.router.url;
    this.router
      .navigate(['', {outlets: {dialog: null}}], {relativeTo: this.activatedRoute})
      .then(() => this.router.navigate(['/nouns/new'], {queryParams: {chapterId: this.chapterId, returnTo}}));
  }
}
