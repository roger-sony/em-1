import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'sentence-details-svg',
  templateUrl: './sentence-details-svg.component.html',
  styleUrls: ['./sentence-details-svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentenceDetailsSvgComponent implements OnInit {
  @Input() name: string;
  @Input() color: string;

  constructor() {}

  ngOnInit(): void {}
}
