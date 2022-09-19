import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'chapter-plans-empty',
  templateUrl: './chapter-plans-empty.component.html',
  styleUrls: ['./chapter-plans-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterPlansEmptyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
