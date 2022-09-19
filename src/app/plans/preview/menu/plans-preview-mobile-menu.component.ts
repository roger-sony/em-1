import {Component, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {OphMenuComponent} from '../../../shared/design/oph-menu/oph-menu.component';

@Component({
  selector: 'plans-preview-mobile-menu',
  templateUrl: './plans-preview-mobile-menu.component.html',
  styleUrls: ['./plans-preview-mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansPreviewMobileMenuComponent {
  @Output()
  public runPlan = new EventEmitter();

  @Output()
  public saveReport = new EventEmitter();

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  @ViewChild('menuButton')
  public menuButtonElement: ElementRef<HTMLButtonElement>;

  public onMenuClick() {
    this.menu.open();
  }

  public onRunPlanClick() {
    this.runPlan.emit();
    this.menu.close();
  }

  public onSaveReportClick() {
    this.saveReport.emit();
    this.menu.close();
  }
}
