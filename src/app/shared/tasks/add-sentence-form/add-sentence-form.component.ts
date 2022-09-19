import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Sentence} from 'src/app/core/model/sentence';

@Component({
  selector: 'add-sentence-form',
  templateUrl: './add-sentence-form.component.html',
  styleUrls: ['./add-sentence-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSentenceFormComponent implements OnInit, OnChanges {
  @Input()
  public sentences: Sentence[];

  @Output()
  public valueChange = new EventEmitter<Sentence>();

  @Output()
  public validityChange = new EventEmitter<boolean>();

  public filteredSentences$: Observable<Sentence[]>;

  private input$ = new BehaviorSubject<string>('');
  private sentences$ = new BehaviorSubject<Sentence[]>([]);

  public selectedSentence = new FormControl('', Validators.required);

  constructor() {}

  ngOnInit(): void {
    this.filteredSentences$ = this.observeInput();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sentences && this.sentences) {
      this.sentences$.next(this.sentences);
    }
  }

  private observeInput(): Observable<Sentence[]> {
    return combineLatest([this.sentences$, this.input$]).pipe(
      map(([sentences, textInput]) => {
        if (textInput) {
          return sentences.filter(s => {
            const input = textInput.toLowerCase().trim();
            const verb = s.verb.name.toLowerCase();
            const noun = s.noun.name.toLowerCase();
            return verb.includes(input) || noun.includes(input) || `${verb} ${noun}`.includes(input);
          });
        }
        return sentences;
      })
    );
  }

  public onInput(value: string) {
    this.validityChange.emit(false);
    this.input$.next(value);
  }

  public onOption(sentence: Sentence) {
    this.validityChange.emit(true);
    this.valueChange.emit(sentence);
  }
}
