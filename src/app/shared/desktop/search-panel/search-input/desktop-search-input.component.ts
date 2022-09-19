import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'desktop-search-input',
  templateUrl: './desktop-search-input.component.html',
  styleUrls: ['./desktop-search-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopSearchInputComponent {
  @Input()
  public value: string;

  @Input()
  public placeholder: string;

  @Output()
  public valueChange = new EventEmitter<string>();

  public onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
