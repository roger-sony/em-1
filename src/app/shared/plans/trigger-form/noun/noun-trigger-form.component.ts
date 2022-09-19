import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {InventoryItem} from '../../../../core/model/inventory-item';
import {NounTriggerFormControl} from '../trigger-form-control';

@Component({
  selector: 'noun-trigger-form',
  templateUrl: './noun-trigger-form.component.html',
  styleUrls: ['./noun-trigger-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounTriggerFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public form: FormGroup;

  @Input()
  public mobile: boolean;

  @Input()
  public nouns: InventoryItem[];

  public readonly controlNames = NounTriggerFormControl;

  public filteredNouns$: Observable<InventoryItem[]>;

  public nounsNameMap$ = new BehaviorSubject<Record<string, InventoryItem>>({});

  private subscriptions = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.filteredNouns$ = this.observeFilteredNouns();
    this.subscriptions.add(this.subscribeToNameValueChanges());
  }

  private observeFilteredNouns(): Observable<InventoryItem[]> {
    return this.nameControl.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map(nameValue => this.nouns.filter(noun => noun.subcategory.toLowerCase().includes(nameValue.toLowerCase())))
    );
  }

  private subscribeToNameValueChanges(): Subscription {
    return combineLatest([this.nameControl.valueChanges, this.nounsNameMap$]).subscribe(([nameValue, nounsNameMap]) => {
      this.idControl.setValue((nounsNameMap[nameValue] || {id: ''}).id);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.nouns && this.nouns) {
      this.nounsNameMap$.next(this.createNounsNameMap(this.nouns));
    }
  }

  private createNounsNameMap(nouns: InventoryItem[]): Record<string, InventoryItem> {
    return (nouns || []).reduce((nounsMap: Record<string, InventoryItem>, noun) => {
      nounsMap[noun.subcategory] = noun;
      return nounsMap;
    }, {});
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onInputClick() {
    if (this.mobile) {
      this.router.navigate(['./noun'], {relativeTo: this.activatedRoute});
    }
  }

  public onCreateClick(event: MouseEvent) {
    event.stopPropagation();

    // TODO use dialog once the new design of noun pages is available
    const returnTo = this.router.url;
    this.router
      .navigate(['', {outlets: {dialog: null}}], {relativeTo: this.activatedRoute})
      .then(() => this.router.navigate(['/nouns/new'], {queryParams: {returnTo}}));
  }

  public trackByNounId(index: number, noun: InventoryItem): string {
    return noun.id;
  }

  public get idControl(): AbstractControl {
    return this.form.get(NounTriggerFormControl.Id);
  }

  public get nameControl(): AbstractControl {
    return this.form.get(NounTriggerFormControl.DisplayName);
  }
}
