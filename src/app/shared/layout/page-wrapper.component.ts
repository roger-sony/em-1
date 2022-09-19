import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {throttleTime} from 'rxjs/operators';
import {AuthenticationService} from '../../auth/auth.service';
import {MobileService} from '../../core/page/mobile.service';

@Component({
  selector: 'page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageWrapperComponent implements OnInit {
  public authenticated$: Observable<boolean>;
  public mobile$: Observable<boolean>;

  constructor(private authenticationService: AuthenticationService, private mobileService: MobileService) {}

  public ngOnInit() {
    this.authenticated$ = this.authenticationService.isLoggedIn;
    this.mobile$ = this.mobileService.observeMobile().pipe(throttleTime(500));
  }
}
