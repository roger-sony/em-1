import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {Chapter} from '../../../core/model/chapter';
import {AddMenuOption} from '../../desktop/add-menu/add-menu-option';
import {ChapterDialogService} from '../../../dialog/chapter-dialog.service';
import {AddMenuDropdownComponent} from '../../desktop/add-menu/dropdown/add-menu-dropdown.component';

@Component({
  selector: 'add-to-chapter',
  templateUrl: './add-to-chapter.component.html',
  styleUrls: ['./add-to-chapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToChapterComponent implements OnChanges {
  @Input()
  public chapters: Chapter[];

  @Input()
  public usedChapterIds: string[];

  @Output()
  public add = new EventEmitter<Chapter>();

  @ViewChild(AddMenuDropdownComponent)
  public dropdown: AddMenuDropdownComponent;

  public options: AddMenuOption[] = [];

  constructor(private chapterDialogService: ChapterDialogService) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.chapters || changes.usedChapterIds) {
      this.options = this.createOptions(this.chapters, this.usedChapterIds);
    }
  }

  private createOptions(chapters: Chapter[], usedChapterIds: string[]): AddMenuOption[] {
    return (chapters || [])
      .filter(chapter => !(usedChapterIds || []).includes(chapter.id))
      .map(chapter => ({
        value: chapter.id,
        displayValue: chapter.name,
      }));
  }

  public onButtonClick() {
    this.dropdown.trigger();
  }

  public onAdd(option: AddMenuOption) {
    const chapter = this.chapters.find(ch => ch.id === option.value);
    this.add.emit(chapter);
  }

  public onCreate() {
    this.chapterDialogService.openNewChapterDialog();
  }
}
