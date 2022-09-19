import {Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {CadenceForm} from '../../../../core/model/form/cadence-form';

@Component({
  selector: 'new-plan-set-cadence',
  templateUrl: './new-plan-set-cadence.component.html',
  styleUrls: ['./new-plan-set-cadence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanSetCadenceComponent implements OnInit, OnChanges {
  @Input()
  public cadenceForm: CadenceForm;

  public cadenceIcon: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cadenceForm && this.cadenceForm) {
      this.findIcon();
    }
  }

  private findIcon() {
    this.cadenceIcon = this.cadenceForm.repetition ? 'clock-v-2' : 'calendar-single-event';
  }

  public onButtonClick() {
    this.router.navigate(['./cadence'], {relativeTo: this.activatedRoute});
  }
}
