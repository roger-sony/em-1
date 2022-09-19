import {Component, OnInit} from '@angular/core';
import {ActionsService} from '../../core/api/legacy/actions.service';
import {SpinnerService} from '../../core/page/spinner.service';
import {TitleService} from '../../core/page/title.service';

/* tslint:disable:no-any */
@Component({
  selector: 'queued-actions',
  templateUrl: './queued-actions.component.html',
  styleUrls: ['./queued-actions.component.css'],
})
export class QueuedActionsComponent implements OnInit {
  actions: any;
  historicalActions: any;
  viewActionHistory: boolean = false;
  retrievedActionHistory: boolean = false;

  constructor(
    private actionsService: ActionsService,
    private loading: SpinnerService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle('Queued Actions');

    this.getActions();
  }

  /*******************************************************************************
                                Service Calls
  *******************************************************************************/

  getActions(): void {
    this.loading.show();
    this.actionsService.getActions().subscribe(a => {
      this.actions = a;
      this.loading.hide();
    });
  }

  deleteAction(id: string): void {
    if (confirm(`Are you sure you want to delete this queued action?`)) {
      console.log('--Removing queued action....');
      this.loading.show();
      this.actionsService.deleteAction(id).subscribe(a => {
        this.getActions();
      });
    }
  }

  getHistoricalActions(): void {
    this.loading.show();
    this.actionsService.getHistoricalActions().subscribe(a => {
      this.historicalActions = a;
      this.viewActionHistory = !this.viewActionHistory;
      this.retrievedActionHistory = true;
      this.loading.hide();
    });
  }

  /*******************************************************************************
                                Click Handlers
  *******************************************************************************/

  deleteActionClick(event: Event, id: string): void {
    event.stopPropagation();
    this.deleteAction(id);
  }

  showActionHistory(): void {
    if (this.retrievedActionHistory) {
      this.viewActionHistory = !this.viewActionHistory;
      return;
    }
    this.getHistoricalActions();
  }

  skedDisplay(sked: string): any {
    if (sked.slice(0, 2) !== ('SU' || 'MO' || 'TU' || 'WE' || 'TH' || 'FR' || 'SA' || 'SU')) {
      return sked;
    }
    let day;
    let time;
    switch (sked.slice(0, 2)) {
      case 'SU':
        day = 'Sunday';
        break;
      case 'MO':
        day = 'Monday';
        break;
      case 'TU':
        day = 'Tuesday';
        break;
      case 'WE':
        day = 'Wednesday';
        break;
      case 'TH':
        day = 'Thursday';
        break;
      case 'FR':
        day = 'Friday';
        break;
      case 'SA':
        day = 'Saturday';
        break;
      case 'SU':
        day = 'Sunday';
        break;
    }

    switch (sked.slice(2, 4)) {
      case '01':
        time = '12am';
        break;
      case '02':
        time = '2am';
        break;
      case '03':
        time = '4am';
        break;
      case '04':
        time = '6am';
        break;
      case '05':
        time = '8am';
        break;
      case '06':
        time = '10am';
        break;
      case '07':
        time = '12pm';
        break;
      case '08':
        time = '2pm';
        break;
      case '09':
        time = '4pm';
        break;
      case '10':
        time = '6pm';
        break;
      case '11':
        time = '8pm';
        break;
      case '12':
        time = '10pm';
        break;
    }
    return `${day} ${time}`;
  }
}
