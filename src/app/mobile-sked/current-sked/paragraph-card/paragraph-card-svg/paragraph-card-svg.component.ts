import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'paragraph-card-svg',
  templateUrl: './paragraph-card-svg.component.html',
  styleUrls: ['./paragraph-card-svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphCardSvgComponent implements OnInit {
  @Input() name: string;
  @Input() color: string;

  constructor() {}

  ngOnInit(): void {}
}
