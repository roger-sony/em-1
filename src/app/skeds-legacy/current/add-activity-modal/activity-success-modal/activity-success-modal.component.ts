import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'sked-activity-success-modal',
  templateUrl: './activity-success-modal.component.html',
  styleUrls: ['./activity-success-modal.component.css'],
})
export class ActivitySuccessModalComponent implements OnInit {
  @Output() closeSuccessModal = new EventEmitter<object>();

  constructor() {}

  ngOnInit() {}

  closeSuccessModalClick(): void {
    this.closeSuccessModal.emit();
  }
}
