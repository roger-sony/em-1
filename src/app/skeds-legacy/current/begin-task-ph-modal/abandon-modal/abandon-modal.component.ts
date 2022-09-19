import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sked-abandon-modal',
  templateUrl: './abandon-modal.component.html',
  styleUrls: ['./abandon-modal.component.css'],
})
export class AbandonModalComponent implements OnInit {
  @Output() closeAbandonModalClick = new EventEmitter<boolean>();
  @Output() closeAbandonModalOnlyClick = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  /*******************************************************************
                          Click Handlers
  *******************************************************************/
  handleCloseModalClick(input: boolean) {
    if (input) {
      this.closeAbandonModalClick.emit(true);
    } else {
      this.closeAbandonModalOnlyClick.emit(true);
    }
  }
}
