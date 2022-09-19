import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {GetAllSkedTemplatesAction} from 'src/app/core/store/sked-templates/sked-templates.action';

@Component({
  selector: 'new-sked-template-dialog',
  templateUrl: './new-sked-template-dialog.component.html',
  styleUrls: ['./new-sked-template-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewSkedTemplateDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('templateNameInput')
  public templateNameInput: ElementRef<HTMLInputElement>;

  public name = new FormControl('');

  constructor(
    private dialog: MatDialogRef<NewSkedTemplateDialogComponent>,
    private router: Router,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(new GetAllSkedTemplatesAction({}));
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.templateNameInput.nativeElement.focus(), 500);
  }

  public onSaveClick() {
    this.router.navigate(['chapters', 'new'], {queryParams: {name: this.name.value}});
    this.dialog.close();
  }
}
