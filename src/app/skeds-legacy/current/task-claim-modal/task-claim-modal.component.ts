import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

/* tslint:disable:no-any */
@Component({
  selector: 'sked-task-claim-modal',
  templateUrl: './task-claim-modal.component.html',
  styleUrls: ['./task-claim-modal.component.css'],
})
export class TaskClaimModalComponent implements OnInit {
  @Input() task: any = {};
  @Output() closeTaskClaimModalClick = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {
    // setTimeout(function(){
    //   this.closeTaskClaimModalClick.emit(true);
    //   console.log('timeout')
    // }, 2000);
  }

  /*******************************************************************
                          Click Handlers
  *******************************************************************/
  handleCloseModalClick() {
    this.closeTaskClaimModalClick.emit(true);
  }
}
