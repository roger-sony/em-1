import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'chapters-list-toolbar',
  templateUrl: './chapters-list-toolbar.component.html',
  styleUrls: ['./chapters-list-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaptersListToolbarComponent implements OnInit {
  @Output()
  public create = new EventEmitter();

  public selectOptions: string[] = ['A to Z', 'Z to A', 'Last Updated'];

  constructor() {}

  ngOnInit(): void {}

  public onCreateButtonClick() {
    this.create.emit();
  }
}
