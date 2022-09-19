import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'oph-option',
  templateUrl: './oph-option.component.html',
  styleUrls: ['./oph-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphOptionComponent {
  @HostBinding('class.oph-option-selected')
  public selected: boolean;

  @HostBinding('class.oph-option-multiple')
  public multiple: boolean;

  @Input()
  @HostBinding('class.oph-option-disabled')
  public disabled: boolean;

  @Input()
  // tslint:disable-next-line:no-any
  public value: any;

  @ViewChild('content')
  public content: ElementRef<HTMLDivElement>;

  public clicked$ = new Subject();

  constructor(public changeDetector: ChangeDetectorRef) {}

  @HostListener('click')
  public onClick() {
    if (!this.disabled) {
      this.clicked$.next(this.value);
    }
  }

  public onCheckboxClick(event: MouseEvent) {
    event.preventDefault();
  }
}
