import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
