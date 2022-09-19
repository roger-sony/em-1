import {Component, ChangeDetectionStrategy, ViewChild, Input, SimpleChanges, OnChanges} from '@angular/core';
import {OphMenuComponent} from 'src/app/shared/design/oph-menu/oph-menu.component';
import {Router} from '@angular/router';

@Component({
  selector: 'tasks-activity-card-filter',
  templateUrl: './tasks-activity-card-filter.component.html',
  styleUrls: ['./tasks-activity-card-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksActivityCardFilterComponent implements OnChanges {
  @Input()
  public activityFilter: string;

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  public checkedMap: Record<string, string> = {};

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activityFilter && this.activityFilter) {
      this.checkedMap = this.activityFilter
        .split(',')
        .reduce((map: Record<string, string>, obj: string) => ((map[obj] = obj), map), {});
    }
  }

  public onToggleClick() {
    this.menu.open();
  }

  public onCheckboxClick(filter: string, checked: boolean) {
    const filterArray = this.activityFilter?.split(',') || [];
    if (checked) {
      filterArray.push(filter);
      this.router.navigate([], {queryParams: {activityFilter: filterArray.join(',')}, queryParamsHandling: 'merge'});
    } else {
      this.router.navigate([], {
        queryParams: {activityFilter: filterArray.filter(status => status !== filter).join(',') || null},
        queryParamsHandling: 'merge',
      });
    }
  }
}
