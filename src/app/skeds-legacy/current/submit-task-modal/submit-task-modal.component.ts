import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

/* tslint:disable:no-any */
@Component({
  selector: 'sked-submit-task-modal',
  templateUrl: './submit-task-modal.component.html',
  styleUrls: ['./submit-task-modal.component.css'],
})
export class SubmitTaskModalComponent implements OnInit {
  @Output() closeSubmitModalOnlyClick = new EventEmitter<boolean>();
  @Output() closeSubmitModalClick = new EventEmitter<boolean>();
  @Input() valueUpdated: any = [];

  constructor() {}

  ngOnInit() {}

  handleCloseSubmitModalOnlyClick(): void {
    this.closeSubmitModalOnlyClick.emit(true);
  }

  handleCloseSubmitModalClick(): void {
    this.closeSubmitModalClick.emit(true);
  }
}
