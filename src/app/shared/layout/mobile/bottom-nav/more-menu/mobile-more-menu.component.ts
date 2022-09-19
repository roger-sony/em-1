import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {DropdownPosition} from '../../../../design/oph-menu/dropdown-position';
import {OphMenuComponent} from '../../../../design/oph-menu/oph-menu.component';
import {MobileNavButtonComponent} from '../nav-button/mobile-nav-button.component';
import {MobileNavDialogType} from '../dialog/mobile-nav-dialog-type';

@Component({
  selector: 'mobile-more-menu',
  templateUrl: './mobile-more-menu.component.html',
  styleUrls: ['./mobile-more-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMoreMenuComponent {
  @Input()
  public navElement: ElementRef<HTMLElement>;

  @Input()
  public routerUrl: string;

  @Input()
  public hideNouns: boolean;

  @Output()
  public openDialog = new EventEmitter<MobileNavDialogType>();

  @ViewChild(MobileNavButtonComponent, {static: true})
  public moreButton: MobileNavButtonComponent;

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  public position = DropdownPosition.TopEnd;

  constructor(private router: Router) {}

  public onTriggerClick() {
    this.menu.trigger();
  }

  public onNounsClick() {
    this.navigateAndCloseMenu('/nouns');
  }

  public onReportsClick() {
    this.openDialogAndCloseMenu(MobileNavDialogType.Reports);
  }

  public onMetricsClick() {
    this.navigateAndCloseMenu('/metrics');
  }

  public onUsersClick() {
    this.openDialogAndCloseMenu(MobileNavDialogType.Users);
  }

  public onChaptersClick() {
    this.navigateAndCloseMenu(MobileNavDialogType.Chapters);
  }

  public onMobileSkedClick() {
    this.navigateAndCloseMenu(MobileNavDialogType.MobileSked);
  }

  private navigateAndCloseMenu(url: string) {
    this.router.navigate([url]);
    this.menu.close();
  }

  private openDialogAndCloseMenu(type: MobileNavDialogType) {
    this.menu.close();
    this.openDialog.emit(type);
  }
}
