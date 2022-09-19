import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {SkedDialogService} from '../../../../dialog/sked-dialog.service';
import {SortOption} from '../../../../core/model/search/sort-option';
import {Router} from '@angular/router';

@Component({
  selector: 'sked-template-control-panel',
  templateUrl: './sked-template-control-panel.component.html',
  styleUrls: ['./sked-template-control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedTemplateControlPanelComponent {
  @Input() showEmpty: boolean;
  @Input() sortField: string;
  @Input() sortDirection: string;
  @Input() canEdit: boolean;

  public sortOptions: SortOption[] = [
    {
      field: 'displayName',
      label: 'Sort by Name',
    },
    {
      field: 'lastUpdated',
      label: 'Sort by Last Modified',
    },
  ];

  constructor(private skedDialogService: SkedDialogService, private router: Router) {}

  public onCreateClick() {
    this.skedDialogService.openNewSkedTemplateDialog();
  }

  public onShowEmptyChange(value: boolean) {
    this.router.navigate([], {queryParams: {empty: value || null}, queryParamsHandling: 'merge'});
  }

  public onSortFieldChange(value: string) {
    this.router.navigate([], {queryParams: {sortField: value || null}, queryParamsHandling: 'merge'});
  }

  public onSortDirectionChange(value: string) {
    this.router.navigate([], {queryParams: {sortDirection: value || null}, queryParamsHandling: 'merge'});
  }
}
