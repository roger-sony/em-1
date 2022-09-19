import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'mobile-search-bar',
  templateUrl: './mobile-search-bar.component.html',
  styleUrls: ['./mobile-search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSearchBarComponent {
  @Input()
  public search: string;

  @Input()
  public disabled: boolean;

  @Output()
  public searchChange = new EventEmitter<string>();

  public typing$ = new BehaviorSubject(false);

  public onInputTyping(typing: boolean) {
    this.typing$.next(typing);
  }

  public onInputValueChange(value: string) {
    this.searchChange.emit(value);
  }

  public onClearButtonMouseDown() {
    this.searchChange.emit('');
  }
}
