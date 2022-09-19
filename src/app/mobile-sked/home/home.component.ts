import {Component, ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public readonly now: Date = new Date();
  public readonly searchControl: FormControl = new FormControl(null);
  public readonly searchResult: Observable<string[]> = this.initSearchSubscription();

  constructor() {}

  initSearchSubscription() {
    return this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return ['first result', 'second result'].filter(v => v.toLocaleLowerCase().includes(filterValue));
  }
}
