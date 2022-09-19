import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'chapters-card-chip',
  templateUrl: './chapters-card-chip.component.html',
  styleUrls: ['./chapters-card-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaptersCardChipComponent implements OnInit {
  @Input()
  public count: number;

  @Input()
  public iconName: string;

  constructor() {}

  ngOnInit(): void {}
}
