import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
