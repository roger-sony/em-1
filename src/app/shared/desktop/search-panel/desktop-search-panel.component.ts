import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Chapter} from '../../../core/model/chapter';
import {SearchParams} from '../../../core/model/search/search-params';
import {SortOption} from '../../../core/model/search/sort-option';

@Component({
  selector: 'desktop-search-panel',
  templateUrl: './desktop-search-panel.component.html',
  styleUrls: ['./desktop-search-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopSearchPanelComponent {
  @Input() public inputHidden: boolean;
  @Input() public chapters: Chapter[];
  @Input() public defaultChapterId: string;
  @Input() public sortOptions: SortOption[];
  @Input() public searchParams: SearchParams;
  @Input() public placeholder: string;
  @Input() public hideEmptyToggle: boolean;
  @Input() public hideIcons: boolean;
  @Input() public darkBackground: boolean;
  @Input() public canEdit: boolean;

  @Output() public searchParamsChange = new EventEmitter<SearchParams>();

  public onTextChange(text: string) {
    const searchParams = {...this.searchParams, text};
    this.searchParamsChange.emit(searchParams);
  }

  public onChaptersChange(chapterIds: string[]) {
    const searchParams = {...this.searchParams, chapterIds};
    this.searchParamsChange.emit(searchParams);
  }

  public onSortFieldChange(sortField: string) {
    const searchParams = {...this.searchParams, sortField};
    this.searchParamsChange.emit(searchParams);
  }

  public onEmptyChange(empty: boolean) {
    const searchParams = {...this.searchParams, empty};
    this.searchParamsChange.emit(searchParams);
  }

  public onSortDirectionChange(sortDirection: 'asc' | 'desc' | null) {
    const searchParams = {...this.searchParams, sortDirection};
    this.searchParamsChange.emit(searchParams);
  }
}
