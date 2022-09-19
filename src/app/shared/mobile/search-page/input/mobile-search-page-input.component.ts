import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'mobile-search-page-input',
  templateUrl: './mobile-search-page-input.component.html',
  styleUrls: ['./mobile-search-page-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSearchPageInputComponent {
  @Input()
  public placeholder: string;

  @Input()
  public value: string;

  @Output()
  public valueChange = new EventEmitter<string>();

  public onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement?.value);
  }
}
