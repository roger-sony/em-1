import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Sentence} from 'src/app/core/model/sentence';
import {NounDto} from './../../../../core/api/dto/noun.dto';
import {Verb} from './../../../../core/model/verb';

@Component({
  selector: 'sentence-form',
  templateUrl: './sentence-form.component.html',
  styleUrls: ['./sentence-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentenceFormComponent implements OnInit, OnChanges {
  @Input()
  public verbs: Verb[];

  @Input()
  public nouns: NounDto[];

  @Output()
  public valueChange = new EventEmitter<Sentence>();

  public form = new FormGroup({
    verb: new FormControl('', Validators.required),
    noun: new FormControl('', Validators.required),
    priority: new FormControl(null, Validators.required),
    movability: new FormControl(null, Validators.required),
    effort: new FormControl(null, Validators.required),
  });

  public filteredVerbs$: Observable<Verb[]>;
  public filteredNouns$: Observable<NounDto[]>;

  public verbs$ = new BehaviorSubject<Verb[]>([]);
  public nouns$ = new BehaviorSubject<NounDto[]>([]);
  public verbInput$ = new BehaviorSubject<string>('');
  public nounInput$ = new BehaviorSubject<string>('');

  public readonly options: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() {}

  ngOnInit(): void {
    this.filteredVerbs$ = this.observeVerbInput();
    this.filteredNouns$ = this.observeNounInput();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.verbs && this.verbs) {
      this.verbs$.next(this.verbs);
    }
    if (changes.nouns && this.nouns) {
      this.nouns$.next(this.nouns);
    }
  }

  private observeVerbInput(): Observable<Verb[]> {
    return combineLatest([this.verbs$, this.verbInput$]).pipe(
      map(([verbs, input]) => verbs.filter(v => v.name.toLowerCase().includes(input)))
    );
  }

  private observeNounInput(): Observable<NounDto[]> {
    return combineLatest([this.nouns$, this.nounInput$]).pipe(
      map(([nouns, input]) => nouns.filter(n => n.name.toLowerCase().includes(input)))
    );
  }

  public onVerbInput(value: string) {
    this.verbInput$.next(value);
  }

  public onVerbSelect(verb: Verb) {
    this.form.patchValue({verb});
  }

  public trackByVerbId(index: number, verb: Verb): string {
    return verb.id;
  }

  public onNounInput(value: string) {
    this.nounInput$.next(value);
  }

  public onNounSelect(noun: NounDto) {
    this.form.patchValue({noun});
  }

  public trackByNounId(index: number, noun: NounDto): string {
    return noun.id;
  }

  public onAdd() {
    const sentenceForm = {
      ...this.form.value,
      verb: this.verbs.find(verb => verb.name === this.form.value.verb),
      noun: this.nouns.find(noun => noun.name === this.form.value.noun),
    };
    this.valueChange.emit(sentenceForm);

    this.form.setValue({
      verb: '',
      noun: '',
      priority: null,
      movability: null,
      effort: null,
    });
  }
}
