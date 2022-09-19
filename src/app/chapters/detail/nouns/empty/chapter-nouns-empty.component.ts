import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'chapter-nouns-empty',
  templateUrl: './chapter-nouns-empty.component.html',
  styleUrls: ['./chapter-nouns-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterNounsEmptyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
