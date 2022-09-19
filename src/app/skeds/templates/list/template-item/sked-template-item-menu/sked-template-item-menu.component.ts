import {Component, OnInit, ChangeDetectionStrategy, ViewChild, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {FlexSkedTemplate} from 'src/app/core/model/flex-sked-template';
import {
  CreateSkedTemplateAction,
  DeleteSkedTemplateAction,
  GetAllSkedTemplatesAction,
  UpdateSkedTemplateAction,
} from 'src/app/core/store/skeds/skeds.action';
import {MessageService} from 'src/app/services/message.service';
import {OphMenuComponent} from 'src/app/shared/design/oph-menu/oph-menu.component';
import {SkedTemplateDeleteDialogComponent} from '../../..//shared/delete-dialog/sked-template-delete-dialog.component';
import {SkedTemplateUseDialogComponent} from '../../../shared/use-dialog/sked-template-use-dialog.component';

@Component({
  selector: 'sked-template-item-menu',
  templateUrl: './sked-template-item-menu.component.html',
  styleUrls: ['./sked-template-item-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedTemplateItemMenuComponent implements OnInit {
  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  @Input()
  public template: FlexSkedTemplate;

  constructor(
    private messageService: MessageService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store$: Store
  ) {}

  ngOnInit(): void {}

  public onToggleClick() {
    this.menu.open();
  }

  public onEditClick() {
    this.router.navigate([this.template.id], {relativeTo: this.activatedRoute});
  }

  public onUseTemplateClick() {
    this.menu.close();
    const dialog = this.dialog.open(SkedTemplateUseDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        const skedTemplate = {
          id: this.template.id,
          status: 'next',
          statusUpdate: true,
          lastUpdated: new Date(),
        };
        this.store$.dispatch(
          new UpdateSkedTemplateAction({
            skedId: this.template.id,
            skedTemplate,
            onSuccess: () => this.onUpdateSkedTemplateSuccess(),
            onFailure: () => this.onUpdateSkedTemplateFailure(),
          })
        );
      }
    });
  }

  public onDuplicateClick() {
    this.menu.close();
    const template = {
      displayName: `${this.template.displayName} (COPY)`,
      lastUpdated: new Date(),
      status: 'draft',
      skeds: this.template.skeds,
      live: false,
    };
    this.store$.dispatch(
      new CreateSkedTemplateAction({
        skedTemplate: template,
        onSuccess: () => this.onDuplicateTemplateSuccess(),
        onFailure: () => this.onDuplicateTemplateFailure(),
      })
    );
  }

  public onDeleteClick() {
    this.menu.close();
    const dialog = this.dialog.open(SkedTemplateDeleteDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store$.dispatch(
          new DeleteSkedTemplateAction({
            skedTemplateId: this.template.id,
            onSuccess: () => this.onDeleteSkedTemplateSuccess(),
            onFailure: () => this.onDeleteSkedTemplateFailure(),
          })
        );
      }
    });
  }

  private onUpdateSkedTemplateSuccess() {
    this.messageService.add('Success! Your Chapter has been updated.');
    this.store$.dispatch(new GetAllSkedTemplatesAction({}));
  }

  private onUpdateSkedTemplateFailure() {
    this.messageService.add('Error: There was a problem updating the Chapter.');
  }

  public onDuplicateTemplateSuccess() {
    this.store$.dispatch(new GetAllSkedTemplatesAction({}));
    this.messageService.add('Success! Your template has been duplicated.');
  }

  public onDuplicateTemplateFailure() {
    this.messageService.add('Error: There was a problem duplicating your Chapter.');
    this.router.navigate(['chapters'], {queryParams: {name: null}});
  }

  private onDeleteSkedTemplateSuccess() {
    this.store$.dispatch(new GetAllSkedTemplatesAction({}));
    this.messageService.add('Success! Your Chapter has been deleted.');
  }

  private onDeleteSkedTemplateFailure() {
    this.messageService.add('Error: There was a problem deleting your Chapter.');
  }
}
