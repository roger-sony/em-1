import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarSearchComponent implements OnInit {
  @Input()
  public placeholder: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.router.navigate([], {queryParams: {search: input.value || null}, queryParamsHandling: 'merge'});
  }
}
