import {BehaviorSubject} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'adjective-chip-list',
  templateUrl: './adjective-chip-list.component.html',
  styleUrls: ['./adjective-chip-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjectiveChipListComponent implements OnChanges {
  @Input()
  public label: string;

  @Input()
  public value: string[];

  @Input()
  public name: string;

  @Output()
  public valueChange = new EventEmitter<string[]>();

  @ViewChild('input')
  public input: ElementRef;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  public inputFocused$ = new BehaviorSubject<boolean>(true);
  public storedInputValue = new BehaviorSubject<string>('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes.name && this.name) {
      this.checkForInputFocus();
    }
  }

  private checkForInputFocus() {
    if (this.name === 'number' || this.name === 'selection' || this.name === 'multiselection') {
      this.inputFocused$.next(true);
      setTimeout(() => {
        this.input?.nativeElement.focus();
      }, 300);
    } else {
      this.inputFocused$.next(false);
    }
  }

  public onAdd(event: MatChipInputEvent): void {
    const inputValue = (event.value || '').trim();
    if (inputValue) {
      const currentValue = [...this.value];
      currentValue.push(inputValue);
      this.valueChange.emit(currentValue);
    }
    this.input.nativeElement.value = '';
  }

  public onRemove(name: string): void {
    const index = this.value.indexOf(name);

    if (index >= 0) {
      const currentValue = [...this.value];
      currentValue.splice(index, 1);
      this.valueChange.emit(currentValue);
    }
  }

  public onChipListFocus() {
    this.inputFocused$.next(true);
  }

  public onChipListBlur() {
    this.inputFocused$.next(false);
  }

  // tslint:disable-next-line:no-any
  public onKeyUp(event: any) {
    if (event.code === 'Backspace' && !this.storedInputValue.value) {
      const currentValue = [...this.value];
      currentValue.pop();
      this.valueChange.emit(currentValue);
    }
    this.storedInputValue.next(event.target.value);
  }
}
