import {Component, OnInit} from '@angular/core';
import {TitleService} from '../core/page/title.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css'],
})
export class MetricsComponent implements OnInit {
  charts: string[] = ['Tasks per Sked', 'Subtasks per Task', 'Number of Nouns by Location'];
  selected: string = 'Tasks per Sked';

  constructor(private titleService: TitleService) {}

  public ngOnInit() {
    this.titleService.setPageTitle('Metrics');
  }
}
