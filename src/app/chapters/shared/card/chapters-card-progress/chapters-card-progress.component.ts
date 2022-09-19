import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'chapters-card-progress',
  templateUrl: './chapters-card-progress.component.html',
  styleUrls: ['./chapters-card-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaptersCardProgressComponent implements OnInit {
  @Input()
  public progress: number;

  constructor() {}

  ngOnInit(): void {}
}
