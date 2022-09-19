import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'chapters-list-header',
  templateUrl: './chapters-list-header.component.html',
  styleUrls: ['./chapters-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaptersListHeaderComponent {}
