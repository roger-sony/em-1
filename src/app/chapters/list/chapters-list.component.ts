import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {GetAllChaptersAction} from '../../core/store/chapters/chapters.action';
import {selectAllChapters, selectFilteredChapters} from 'src/app/core/store/chapters/chapters.selector';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ChapterDialogService} from 'src/app/dialog/chapter-dialog.service';
import {TitleService} from '../../core/page/title.service';
import {Chapter} from '../../core/model/chapter';
import {MobileService} from 'src/app/core/page/mobile.service';

@Component({
  selector: 'chapters-list',
  templateUrl: './chapters-list.component.html',
  styleUrls: ['./chapters-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaptersListComponent implements OnInit {
  public chapters$: Observable<Chapter[]>;
  public mobile$: Observable<boolean>;

  public filteredChapters$: Observable<Chapter[]>;

  constructor(
    private chapterDialogService: ChapterDialogService,
    private mobileService: MobileService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store$: Store<{}>,
    private titleService: TitleService
  ) {}

  public ngOnInit(): void {
    this.mobile$ = this.mobileService.observeMobile();
    this.titleService.setPageTitle('Chapters');

    //TODO: add onsuccess and onfailure
    this.store$.dispatch(new GetAllChaptersAction({}));

    this.chapters$ = this.store$.pipe(select(selectAllChapters));
    this.filteredChapters$ = this.store$.pipe(select(selectFilteredChapters));
  }

  public onCardClick(id: string) {
    this.router.navigate([`./${id}`], {relativeTo: this.activatedRoute});
  }

  public onCreateButtonClick() {
    this.chapterDialogService.openNewChapterDialog();
  }
}
