import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {DecisionTableService} from '../../../core/api/legacy/decision-table.service';
import {RuleTriggerService} from '../../../core/api/legacy/rule-trigger.service';

/* tslint:disable:no-any */
@Component({
  selector: 'sked-add-activity-modal',
  templateUrl: './add-activity-modal.component.html',
  styleUrls: ['./add-activity-modal.component.css'],
})
export class AddActivityModalComponent implements OnInit {
  @Output() toggleAddActivityModal = new EventEmitter<object>();
  // availableDTables: any;
  selectedDTable: string;
  viewingActivitySuccessModal: boolean = false;
  availableDTables: any;

  constructor(private dTableService: DecisionTableService, private rtService: RuleTriggerService) {}

  ngOnInit() {
    this.getCurrentSkedDTables();
  }

  getCurrentSkedDTables(): void {
    this.dTableService.getCurrentSkedDTables().subscribe(dt => {
      this.availableDTables = dt;
    });
  }

  toggleAddActivityModalClick(): void {
    this.toggleAddActivityModal.emit();
  }

  runRuleOnDemand(): void {
    this.rtService.runDTableOnDemand(this.selectedDTable, false, true).subscribe(d => {
      this.viewingActivitySuccessModal = true;
    });
  }
}
