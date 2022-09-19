import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Input} from '@angular/core';
import {OphMenuComponent} from '../../../../../shared/design/oph-menu/oph-menu.component';
import {Router, ActivatedRoute} from '@angular/router';
import {DeleteNounRuleTriggerAction} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.action';
import {DeleteTaskRuleTriggerAction} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.action';
import {Store} from '@ngrx/store';
import {NounRuleTrigger} from '../../../../../core/model/noun-rule-trigger';
import {TaskRuleTrigger} from '../../../../../core/model/task-rule-trigger';

@Component({
  selector: 'mobile-triggers-menu',
  templateUrl: './mobile-triggers-menu.component.html',
  styleUrls: ['./mobile-triggers-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileTriggersMenuComponent implements OnInit {
  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  @Input()
  private noun: boolean;

  @Input()
  trigger: NounRuleTrigger | TaskRuleTrigger;

  @Input()
  planId: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store$: Store<{}>) {}

  ngOnInit(): void {}

  public onToggleClick() {
    this.menu.open();
  }

  public onClickEdit(): void {
    this.menu.close();
    this.router.navigate([`./trigger/${this.trigger.id}`], {relativeTo: this.activatedRoute});
  }

  public onClickDelete(): void {
    this.menu.close();
    if (this.noun) {
      this.store$.dispatch(new DeleteNounRuleTriggerAction({id: this.trigger.id}));
    } else {
      this.store$.dispatch(new DeleteTaskRuleTriggerAction({id: this.trigger.id}));
    }
  }
}
