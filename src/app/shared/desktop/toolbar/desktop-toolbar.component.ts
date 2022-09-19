import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'desktop-toolbar',
  templateUrl: './desktop-toolbar.component.html',
  styleUrls: ['./desktop-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopToolbarComponent implements OnInit {
  @Output()
  public buttonClick = new EventEmitter();

  @Input()
  public searchPlaceholder: string;

  @Input()
  public selectOptions: string[];

  @Input()
  public buttonText: string;

  @Input()
  public selectPlaceholder: string;

  constructor() {}

  ngOnInit(): void {}

  public onButtonClick() {
    this.buttonClick.emit();
  }
}
