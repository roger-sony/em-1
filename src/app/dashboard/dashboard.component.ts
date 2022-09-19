import {Component, OnInit} from '@angular/core';
import {TitleService} from '../core/page/title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private titleService: TitleService) {}

  public ngOnInit() {
    this.titleService.setPageTitle('Dashboard');
  }
}
