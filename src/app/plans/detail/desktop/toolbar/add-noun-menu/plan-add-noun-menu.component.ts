import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {GLOBAL_CONDITION_NAME} from '../../nouns-list/util/create-global-condition-group';
import {select, Store} from '@ngrx/store';
import {selectFieldValues} from '../../../../../core/store/inventory/inventory.selector';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AddMenuOption} from '../../../../../shared/desktop/add-menu/add-menu-option';
import {ActivatedRoute, Router} from '@angular/router';
import {AddMenuComponent} from '../../../../../shared/desktop/add-menu/add-menu.component';

@Component({
  selector: 'plan-add-noun-menu',
  templateUrl: './plan-add-noun-menu.component.html',
  styleUrls: ['./plan-add-noun-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanAddNounMenuComponent implements OnInit {
  @ViewChild(AddMenuComponent)
  public addMenu: AddMenuComponent;

  public options$: Observable<AddMenuOption[]>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit() {
    this.options$ = this.store$.pipe(
      select(selectFieldValues),
      map(fieldValues => fieldValues?.subcategory?.map(value => ({value})))
    );
  }

  public onAddNounCondition(option: AddMenuOption) {
    this.addCondition(option.value);
  }

  public onAddGlobalCondition() {
    this.addMenu.close();
    this.addCondition(GLOBAL_CONDITION_NAME);
  }

  public addCondition(groupName: string) {
    this.router.navigate([{editedGroup: groupName}], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
    });
  }

  public onCreateNoun() {
    // TODO use dialog once new design of noun pages is available
    this.router.navigate(['/nouns/new'], {queryParams: {returnTo: this.router.url}});
  }
}
