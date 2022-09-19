import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'mobile-search-input',
  templateUrl: './mobile-search-input.component.html',
  styleUrls: ['./mobile-search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSearchInputComponent {
  @Input()
  public value: string;

  @Input()
  public disabled: boolean;

  @Output()
  public valueChange = new EventEmitter<string>();

  @Output()
  public typing = new EventEmitter<boolean>();

  public onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }

  public onFocus() {
    this.typing.emit(true);
  }

  public onBlur() {
    this.typing.emit(false);
  }
}
