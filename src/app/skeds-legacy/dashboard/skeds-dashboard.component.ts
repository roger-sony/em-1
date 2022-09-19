import {Component, OnDestroy, OnInit} from '@angular/core';
import {startWith, switchMap, takeUntil} from 'rxjs/operators';
import {Subject, interval} from 'rxjs';
import {SkedService} from '../../core/api/legacy/sked.service';
import {SpinnerService} from '../../core/page/spinner.service';
import {TitleService} from '../../core/page/title.service';

/* tslint:disable:no-any */
@Component({
  selector: 'skeds-dashboard',
  templateUrl: './skeds-dashboard.component.html',
  styleUrls: ['./skeds-dashboard.component.css'],
})
export class SkedsDashboardComponent implements OnInit, OnDestroy {
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  skeds: any = {};
  destroy: Subject<unknown>;

  /*******************************************************************************
                      Constructor, Lifecycle Hooks
*******************************************************************************/
  constructor(private skedService: SkedService, private loading: SpinnerService, private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setPageTitle('Sked Dashboard');

    this.loading.show();
    this.destroy = new Subject();
    interval(10000)
      .pipe(
        takeUntil(this.destroy),
        startWith(0),
        switchMap(() => this.skedService.getSkeds())
      )
      .subscribe(s => this.structureSkedsForDisplay(s));
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }
  /*******************************************************************************
                                Utilities
*******************************************************************************/
  structureSkedsForDisplay(skedsArray: any[]): void {
    this.skeds.Sunday = skedsArray.slice(0, 12);
    this.skeds.Monday = skedsArray.slice(12, 24);
    this.skeds.Tuesday = skedsArray.slice(24, 36);
    this.skeds.Wednesday = skedsArray.slice(36, 48);
    this.skeds.Thursday = skedsArray.slice(48, 60);
    this.skeds.Friday = skedsArray.slice(60, 72);
    this.skeds.Saturday = skedsArray.slice(72, 84);
    this.loading.hide();
  }
}
