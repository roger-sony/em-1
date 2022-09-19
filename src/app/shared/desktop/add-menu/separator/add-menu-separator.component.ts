import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'add-menu-separator',
  templateUrl: './add-menu-separator.component.html',
  styleUrls: ['./add-menu-separator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMenuSeparatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
