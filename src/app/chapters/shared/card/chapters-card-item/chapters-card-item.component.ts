import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'chapters-card-item',
  templateUrl: './chapters-card-item.component.html',
  styleUrls: ['./chapters-card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaptersCardItemComponent implements OnInit {
  @Input()
  public iconName: string;

  @Input()
  public size: number;

  constructor() {}

  ngOnInit(): void {}
}
