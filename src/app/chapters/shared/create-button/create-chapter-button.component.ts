import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'create-chapter-button',
  templateUrl: './create-chapter-button.component.html',
  styleUrls: ['./create-chapter-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateChapterButtonComponent {}
