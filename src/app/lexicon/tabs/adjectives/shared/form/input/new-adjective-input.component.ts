import {BehaviorSubject} from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'new-adjective-input',
  templateUrl: './new-adjective-input.component.html',
  styleUrls: ['./new-adjective-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAdjectiveInputComponent implements AfterViewInit {
  @Input()
  public value: string;

  @Input()
  public new: boolean;

  @Output()
  public valueChange = new EventEmitter<string>();

  @ViewChild('nameInput')
  nameInput: ElementRef;

  public focused$ = new BehaviorSubject<boolean>(false);

  ngAfterViewInit() {
    if (this.new) {
      setTimeout(() => {
        this.nameInput.nativeElement.focus();
      }, 300);
    }
  }

  public onInput(value: string) {
    this.valueChange.emit(value);
  }

  public onClearText() {
    this.valueChange.emit('');
    this.nameInput.nativeElement.focus();
  }

  public onFocus() {
    this.focused$.next(true);
  }

  public onBlur() {
    this.focused$.next(false);
  }

  public onKeydown(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      event.preventDefault();
    }
  }
}
