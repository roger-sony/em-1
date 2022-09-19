import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'paragraph-details-svg',
  templateUrl: './paragraph-details-svg.component.html',
  styleUrls: ['./paragraph-details-svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphDetailsSvgComponent implements OnInit {
  @Input() name: string;
  @Input() color: string;

  constructor() {}

  ngOnInit(): void {}
}
