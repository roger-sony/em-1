import {Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges, Output, EventEmitter} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ChecklistItem} from 'src/app/core/model/checklist-item';

@Component({
  selector: 'oph-checklist',
  templateUrl: './oph-checklist.component.html',
  styleUrls: ['./oph-checklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphChecklistComponent implements OnChanges {
  @Input() public list: ChecklistItem[];
  @Input() public canEdit: boolean;

  @Output() public valueChange = new EventEmitter<ChecklistItem[]>();
  @Output() public edited = new EventEmitter<boolean>();

  public checkList: ChecklistItem[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.list && this.list) {
      this.checkList = [...this.list, {value: false, displayValue: ''}];
    }
  }

  public onInput(value: string, index: number) {
    this.checkList[index].displayValue = value;
    if (this.checkList[this.checkList.length - 1].displayValue) {
      this.checkList.push({value: false, displayValue: ''});
    }
    this.emitChanges();
  }

  public onDelete(index: number) {
    if (this.checkList.length === 1) {
      this.checkList[0].displayValue = '';
      this.emitChanges();
      return;
    }
    this.checkList.splice(index, 1);
    this.emitChanges();
  }

  public handleDrop(event: CdkDragDrop<string[]>) {
    if (this.checkList.length > 1) {
      moveItemInArray(this.checkList, event.previousIndex, event.currentIndex);
      this.emitChanges();
    }
  }

  public emitChanges() {
    const checkList = this.checkList.filter(item => item.displayValue);
    this.edited.emit(this.validateChecklist(checkList, this.list));
    this.valueChange.emit(checkList);
  }

  private validateChecklist(checkList: ChecklistItem[], originalCheckList: ChecklistItem[]): boolean {
    return (
      checkList.length !== originalCheckList.length ||
      checkList.some((item, index) => item.displayValue !== originalCheckList[index]?.displayValue)
    );
  }
}
