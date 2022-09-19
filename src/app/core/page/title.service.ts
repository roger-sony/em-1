import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {selectRouterParam} from '../store/router/router.selector';
import {filter, switchMap} from 'rxjs/operators';
import {selectChapterById} from '../store/chapters/chapters.selector';
import {selectDecisionTableById} from '../store/decision-tables/decision-tables.selector';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private store$: Store<{}>, private title: Title) {}

  public setPageTitle(...parts: string[]) {
    const title = parts.concat('Ophanim III').join(' | ');
    this.title.setTitle(title);
  }

  public subscribeToChapterPageTitle(prefix?: string): Subscription {
    return this.store$
      .pipe(
        select(selectRouterParam('chapterId')),
        switchMap(chapterId => this.store$.pipe(select(selectChapterById(chapterId)))),
        filter(chapter => !!chapter)
      )
      .subscribe(chapter => {
        const titleParts = [chapter.name, 'Chapters'];
        if (prefix) {
          titleParts.unshift(prefix);
        }
        this.setPageTitle(...titleParts);
      });
  }

  public subscribeToPlanPageTitle(prefix?: string): Subscription {
    return this.store$
      .pipe(
        select(selectRouterParam('planId')),
        switchMap(planId => this.store$.pipe(select(selectDecisionTableById(planId))))
      )
      .subscribe(plan => {
        const titleParts = plan ? [plan.displayName, 'Plans'] : ['New Plan'];
        if (prefix) {
          titleParts.unshift(prefix);
        }
        this.setPageTitle(...titleParts);
      });
  }
}
