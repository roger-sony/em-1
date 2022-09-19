import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenameDialogComponent implements AfterViewInit {
  @ViewChild('input')
  public input: ElementRef<HTMLInputElement>;

  public options: string[];
  public title: string;
  public value: string;
  public cloning: boolean;

  public valid$ = new BehaviorSubject<boolean>(true);
  public input$ = new BehaviorSubject<string>('');

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {options: string[]; type: string; value?: string; cloning?: boolean},
    public dialog: MatDialogRef<RenameDialogComponent, string>
  ) {
    this.options = data.options || [];
    this.title = data.type;
    this.cloning = data.cloning;
    this.value = data.cloning ? `${data.value} _copy_` : data.value;
  }

  ngAfterViewInit() {
    if (!this.cloning) {
      this.input.nativeElement.select();
    }
  }

  public onInput(value: string) {
    const valid = this.validateInput(value);
    this.valid$.next(valid);
    this.input$.next(value);
  }

  private validateInput(value: string) {
    if (this.cloning) {
      return value && !this.options.some(option => option.toLowerCase() === value.toLowerCase().trim());
    }
    return (
      value &&
      !(
        this.value.toLowerCase() !== value.toLowerCase().trim() &&
        this.options.some(option => option.toLowerCase() === value.toLowerCase().trim())
      )
    );
  }

  public onSave() {
    this.dialog.close(this.input$.value.trim() || this.value);
  }
}
