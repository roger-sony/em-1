import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

/* tslint:disable:no-any */
@Component({
  selector: 'sked-subtask-modal',
  templateUrl: './subtask-modal.component.html',
  styleUrls: ['./subtask-modal.component.css'],
})
export class SubtaskModalComponent implements OnInit {
  objectKeys: any = Object.keys;
  @Input() task: any = {};
  @Input() recipes: any[];
  @Output() closeSubtaskModalClick = new EventEmitter<boolean>();

  /*******************************************************************
                      Constructor, Lifecycle Hooks
  *******************************************************************/
  constructor() {}

  ngOnInit() {}

  /*******************************************************************
                          Click Handlers
  *******************************************************************/
  handleCloseModalClick() {
    this.closeSubtaskModalClick.emit(true);
  }
}
