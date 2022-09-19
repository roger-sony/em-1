import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {NounDto} from '../../../../../core/api/dto/noun.dto';

@Component({
  selector: 'nouns-grid',
  templateUrl: './nouns-grid.component.html',
  styleUrls: ['./nouns-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounsGridComponent implements OnInit {
  @Input() nouns: NounDto[];

  @Output() createNoun: EventEmitter<{action: string; noun?: NounDto}> = new EventEmitter();
  @Output() updateNouns: EventEmitter<null> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onNounsStatusUpdate() {
    this.updateNouns.emit();
  }

  public onCardClick(noun: NounDto) {
    this.createNoun.emit({action: 'edit', noun});
  }

  onCreateClick() {
    this.createNoun.emit({action: 'create'});
  }

  onEditNoun(noun: NounDto) {
    this.createNoun.emit({action: 'edit', noun});
  }

  onCloneNoun(noun: NounDto) {
    this.createNoun.emit({action: 'clone', noun});
  }
}
