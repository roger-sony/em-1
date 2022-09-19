import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Chapter} from '../../../core/model/chapter';
import {Router} from '@angular/router';

@Component({
  selector: 'chapter-chips',
  templateUrl: './chapter-chips.component.html',
  styleUrls: ['./chapter-chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterChipsComponent implements OnChanges {
  @Input()
  public allChapters: Chapter[];

  @Input()
  public chapterIds: string[];

  @Input()
  public readonly: boolean;

  @Output()
  public remove = new EventEmitter<Chapter>();

  public chapters: Chapter[] = [];

  constructor(private router: Router) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.allChapters || changes.chapterIds) {
      this.chapters = this.allChapters?.filter(chapter => (this.chapterIds || []).includes(chapter.id)) || [];
    }
  }

  public onClick(event: MouseEvent, chapter: Chapter) {
    event.stopPropagation();

    this.router.navigate(['/chapters', chapter.id]);
  }

  public onRemove(chapter: Chapter) {
    this.remove.emit(chapter);
  }

  public trackByChapterId(index: number, chapter: Chapter): string {
    return chapter.id;
  }
}
