import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'current-sked',
  templateUrl: './current-sked.component.html',
  styleUrls: ['./current-sked.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentSkedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
