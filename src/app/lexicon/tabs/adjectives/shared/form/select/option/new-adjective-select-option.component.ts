import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'new-adjective-select-option',
  templateUrl: './new-adjective-select-option.component.html',
  styleUrls: ['./new-adjective-select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAdjectiveSelectOptionComponent {
  @Input()
  public name: string;

  @Input()
  public iconSrc: string;

  @Input()
  public selected: boolean;

  @Output()
  public clicked = new EventEmitter();

  public clicked$ = new Subject();

  public onOptionClick() {
    this.clicked.emit();
  }

  @HostListener('click')
  public onClick() {
    this.clicked$.next(this.name);
  }
}
