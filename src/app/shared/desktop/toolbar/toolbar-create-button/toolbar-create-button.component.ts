import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'toolbar-create-button',
  templateUrl: './toolbar-create-button.component.html',
  styleUrls: ['./toolbar-create-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarCreateButtonComponent implements OnInit {
  @Output()
  public buttonClick = new EventEmitter();

  @Input()
  public buttonText: string;

  constructor() {}

  ngOnInit(): void {}

  public onButtonClick() {
    this.buttonClick.emit();
  }
}
