import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ChapterOverviewComponent} from './chapter-overview.component';
import {ChapterDetailCardComponent} from './chapter-detail-card/chapter-detail-card.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {ChapterCardModule} from '../../shared/card/chapter-card.module';
import {ChapterOverviewDurationPanelComponent} from './duration-panel/chapter-overview-duration-panel.component';
import {ChapterOverviewWatchTimePanelComponent} from './watch-time-panel/chapter-overview-watch-time-panel.component';
import {OphIconModule} from 'src/app/shared/design/oph-icon/oph-icon.module';
import {DateItemComponent} from './shared/date-item/date-item.component';
import {TimeItemComponent} from './shared/time-item/time-item.component';
import {Ng5SliderModule} from 'ng5-slider';
import {NounsActivityCardComponent} from './nouns-activity-card/nouns-activity-card.component';
import {TasksActivityCardComponent} from './tasks-activity-card/tasks-activity-card.component';
import {ChapterOverviewActivityCardComponent} from './shared/activity-card/chapter-overview-activity-card.component';
import {NounsActivityCardItemComponent} from './nouns-activity-card/nouns-activity-card-item/nouns-activity-card-item.component';
import {TasksActivityCardFilterComponent} from './tasks-activity-card/tasks-activity-card-filter/tasks-activity-card-filter.component';

@NgModule({
  imports: [CommonModule, SharedModule, ChapterCardModule, OphIconModule, Ng5SliderModule],
  declarations: [
    ChapterOverviewComponent,
    ChapterDetailCardComponent,
    ChapterOverviewDurationPanelComponent,
    ChapterOverviewWatchTimePanelComponent,
    DateItemComponent,
    TimeItemComponent,
    NounsActivityCardComponent,
    TasksActivityCardComponent,
    ChapterOverviewActivityCardComponent,
    NounsActivityCardItemComponent,
    TasksActivityCardFilterComponent,
  ],
  exports: [ChapterOverviewComponent],
})
export class ChapterOverviewModule {}
