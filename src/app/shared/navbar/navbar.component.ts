import {Component, OnInit, Renderer2} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../../auth/auth.service';
import {LegacyMenuItem, MENU} from '../../app.constants';
import {Router} from '@angular/router';
import {MatMenuTrigger} from '@angular/material/menu';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  enteredButton = false;
  isMatMenuOpen = false;
  isMatMenu2Open = false;
  prevButtonTrigger: MatMenuTrigger;
  menuList: LegacyMenuItem[];
  underLineToggle: string;
  arrowToggle: string;
  routerUrl: string;
  dynamicZIndex: number = 1050;

  constructor(private authenticationService: AuthenticationService, private ren: Renderer2, private router: Router) {
    this.menuList = MENU;
  }

  ngOnInit() {
    this.loggedIn$ = this.authenticationService.isLoggedIn;
    //This set timeout is here because router info (this.router.url) wasn't defined fast enough
    setTimeout(() => {
      this.checkForUnderline();
    }, 0);
  }

  /***************************************************************************
                            Menu Behavior
  NOTE: This extensive workaround is required in order to make the nav menus
  open and close on hover state as expected.
  See Github Issue: https://github.com/angular/components/issues/2080
  See Workaround Explanation: https://stackoverflow.com/questions/53618333/how-to-open-and-close-angular-mat-menu-on-hover/53618962#53618962
  ***************************************************************************/
  menuenter(identifier: LegacyMenuItem) {
    this.underLineToggle = identifier.label;
    this.isMatMenuOpen = true;
    if (this.isMatMenu2Open) {
      this.isMatMenu2Open = false;
    }
  }

  menuLeave(trigger: MatMenuTrigger, button: MatButton) {
    this.underLineToggle = this.routerUrl;
    this.arrowToggle = '';
    setTimeout(() => {
      if (!this.isMatMenu2Open && !this.enteredButton) {
        this.isMatMenuOpen = false;
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenuOpen = false;
      }
    }, 80);
  }

  menu2enter() {
    this.isMatMenu2Open = true;
  }

  menu2Leave(trigger1: MatMenuTrigger, trigger2: MatMenuTrigger, button: MatButton) {
    setTimeout(() => {
      if (this.isMatMenu2Open) {
        trigger1.closeMenu();
        this.isMatMenuOpen = false;
        this.isMatMenu2Open = false;
        this.enteredButton = false;
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.isMatMenu2Open = false;
        trigger2.closeMenu();
      }
    }, 100);
  }

  buttonEnter(trigger: MatMenuTrigger, identifier: LegacyMenuItem) {
    this.dynamicZIndex = 1055;
    this.underLineToggle = identifier.label;
    setTimeout(() => {
      if (this.prevButtonTrigger && this.prevButtonTrigger !== trigger) {
        this.prevButtonTrigger.closeMenu();
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
      } else if (!this.isMatMenuOpen) {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
        trigger.openMenu();
      } else {
        this.enteredButton = true;
        this.prevButtonTrigger = trigger;
      }
    });
  }

  buttonLeave(trigger: MatMenuTrigger, button: MatButton) {
    this.dynamicZIndex = 1050;
    this.underLineToggle = this.routerUrl;
    setTimeout(() => {
      if (this.enteredButton && !this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      }
      if (!this.isMatMenuOpen) {
        trigger.closeMenu();
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(button['_elementRef'].nativeElement, 'cdk-program-focused');
      } else {
        this.enteredButton = false;
      }
    }, 100);
  }

  arrowToggler(label: string) {
    this.arrowToggle = label;
  }

  checkForUnderline(link?: string) {
    switch (link ? link : this.router.url) {
      case '/nouns':
        this.underLineToggle = this.routerUrl = 'Nouns';
        break;
      case '/nouns/new':
        this.underLineToggle = this.routerUrl = 'Nouns';
        break;
      case '/tasks':
        this.underLineToggle = this.routerUrl = 'Tasks';
        break;
      case '/task/new':
        this.underLineToggle = this.routerUrl = 'Tasks';
        break;
      case '/task-scheduler':
        this.underLineToggle = this.routerUrl = 'Tasks';
        break;
      case '/decision-tables':
        this.underLineToggle = this.routerUrl = 'Rules';
        break;
      case '/rule-triggers':
        this.underLineToggle = this.routerUrl = 'Rules';
        break;
      case '/skeds':
        this.underLineToggle = this.routerUrl = 'Skeds';
        break;
      case '/current-sked':
        this.underLineToggle = this.routerUrl = 'Skeds';
        break;
      case '/decision-table-reports':
        this.underLineToggle = this.routerUrl = 'Reports';
        break;
      case '/queued-actions':
        this.underLineToggle = this.routerUrl = 'Reports';
        break;
      case '/metrics':
        this.underLineToggle = this.routerUrl = 'Metrics';
        break;
      case '/users':
        this.underLineToggle = this.routerUrl = 'Users';
        break;
      case '/roles':
        this.underLineToggle = this.routerUrl = 'Users';
        break;
      default:
        this.underLineToggle = this.routerUrl = '';
    }
  }

  clearUnderlineToggle() {
    this.underLineToggle = this.routerUrl = '';
  }
}
