import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'adjectives-toolbar',
  templateUrl: './adjectives-toolbar.component.html',
  styleUrls: ['./adjectives-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjectivesToolbarComponent implements OnInit {
  @Input()
  public searchText: string;

  @Input()
  public hideDisabledToggle: boolean;

  @Output()
  public search = new EventEmitter<string>();

  @Output()
  public hideDisabled = new EventEmitter<boolean>();

  @Output()
  public createNew = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onHideDisabled(event: MatSlideToggleChange) {
    this.hideDisabled.emit(event.checked);
  }
}
