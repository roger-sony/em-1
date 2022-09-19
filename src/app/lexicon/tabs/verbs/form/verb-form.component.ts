import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges, OnChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Verb} from './../../../../core/model/verb';

@Component({
  selector: 'verb-form',
  templateUrl: './verb-form.component.html',
  styleUrls: ['./verb-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerbFormComponent implements OnChanges {
  @Input()
  public verbs: Verb[];

  @Output()
  public add = new EventEmitter<Verb>();

  public verbCount: number;

  public name = new FormControl('');
  public description = new FormControl('');

  public onAdd() {
    this.add.emit({name: this.name.value, description: this.description.value});
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.verbs && this.verbs) {
      this.checkVerbCount();
    }
  }

  private checkVerbCount() {
    if (this.verbs.length > this.verbCount) {
      this.name.setValue('');
      this.description.setValue('');
    }
    this.verbCount = this.verbs.length;
  }
}
