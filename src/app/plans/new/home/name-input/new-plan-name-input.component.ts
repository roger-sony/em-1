import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'new-plan-name-input',
  templateUrl: './new-plan-name-input.component.html',
  styleUrls: ['./new-plan-name-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanNameInputComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input()
  public value: string;

  @Output()
  public valueChange = new EventEmitter<string>();

  @Output()
  public validityChange = new EventEmitter<boolean>();

  @ViewChild('nameInput')
  public nameInput: ElementRef<HTMLInputElement>;

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  private subscriptions = new Subscription();

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.nameControl.setValue(this.value);
    }
  }

  public ngOnInit() {
    this.subscriptions.add(this.subscribeToNameValueChanges());
    setTimeout(() => this.validityChange.emit(this.nameControl.valid));
  }

  private subscribeToNameValueChanges(): Subscription {
    return this.nameControl.valueChanges.pipe(distinctUntilChanged(), debounceTime(200)).subscribe(value => {
      this.valueChange.emit(value);
      this.validityChange.emit(!!value);
    });
  }

  public ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public get nameControl(): AbstractControl {
    return this.form.get('name');
  }
}
