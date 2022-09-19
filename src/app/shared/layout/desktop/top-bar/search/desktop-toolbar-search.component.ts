import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

@Component({
  selector: 'desktop-toolbar-search',
  templateUrl: './desktop-toolbar-search.component.html',
  styleUrls: ['./desktop-toolbar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopToolbarSearchComponent {
  @HostBinding('attr.title')
  public title = 'Search is not enabled.';
}
