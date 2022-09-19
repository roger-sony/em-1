import {Component, OnInit} from '@angular/core';
import {DialogService} from './dialog/dialog.service';
import {SpinnerService} from './core/page/spinner.service';

@Component({
  selector: 'oph-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Ophanim II v1';

  constructor(private dialogService: DialogService, public loading: SpinnerService) {}

  public ngOnInit(): void {
    this.dialogService.init();

    const theme: string = localStorage.getItem('theme') || '';
    document.body.classList.add(theme || 'light-mode');
  }
}
