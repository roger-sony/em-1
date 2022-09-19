import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'toolbar-select',
  templateUrl: './toolbar-select.component.html',
  styleUrls: ['./toolbar-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarSelectComponent implements OnInit {
  @Input()
  public options: string[];

  @Input()
  public placeholder: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onChange(filter: string) {
    this.router.navigate([], {queryParams: {filter}, queryParamsHandling: 'merge'});
  }
}
