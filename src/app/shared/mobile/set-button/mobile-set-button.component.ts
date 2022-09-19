import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'mobile-set-button',
  templateUrl: './mobile-set-button.component.html',
  styleUrls: ['./mobile-set-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSetButtonComponent implements OnInit {
  @Output()
  buttonClick = new EventEmitter();

  @Input()
  public iconName: string;

  constructor() {}

  ngOnInit(): void {}

  public onButtonClick() {
    this.buttonClick.emit();
  }
}
