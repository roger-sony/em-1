import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {OphMenuComponent} from '../../../../../shared/design/oph-menu/oph-menu.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UpdateValuesComponent} from './update-values/update-values.component';
import {NounDto} from '../../../../../core/api/dto/noun.dto';
import {RenameComponent} from './rename/rename.component';
import {NounsApiService} from '../../../../../core/api/nouns-api.service';
import {MessageService} from '../../../../../services/message.service';
import {DeleteNounConfirmComponent} from './delete-noun-confirm/delete-noun-confirm.component';
import {ChangeNounStatusConfirmComponent} from './change-noun-status-confirm/change-noun-status-confirm.component';
import {UpdateNounAction} from '../../../../../core/store/nouns/nouns.action';
import {Store} from '@ngrx/store';

@Component({
  selector: 'lexicon-noun-card',
  templateUrl: './lexicon-noun-card.component.html',
  styleUrls: ['./lexicon-noun-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LexiconNounCardComponent implements OnInit {
  @ViewChild(OphMenuComponent) public menu: OphMenuComponent;
  @ViewChild('menuButton') public menuButtonElement: ElementRef<HTMLButtonElement>;

  @Input() readonly noun: NounDto;
  @Input() readonly hideHeaderBottomBorder: boolean;
  @Input() readonly hideHeader: boolean;
  @Input() readonly title: string;

  @Output() readonly editNoun: EventEmitter<NounDto> = new EventEmitter();
  @Output() readonly cloneNoun: EventEmitter<NounDto> = new EventEmitter();
  @Output() readonly nounStatusUpdated: EventEmitter<null> = new EventEmitter();

  readonly iconName: string = 'box-in-grey-circle';

  public showMore: boolean = false;

  constructor(
    private nounsApiService: NounsApiService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private store$: Store
  ) {}

  ngOnInit() {}

  public openMenu(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.menu.open();
  }

  public onDisableClick() {
    this.dialog
      .open(ChangeNounStatusConfirmComponent, {
        ...new MatDialogConfig(),
        width: '280px',
        data: {
          noun: this.noun,
          action: 'disable',
        },
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.nounsApiService.disableNoun(this.noun.id).subscribe(
            () => {
              this.messageService.add(`'${this.noun.name}' was disabled`);
              this.nounStatusUpdated.emit();
              this.menu.close();
            },
            () => this.messageService.add(`Can't disable noun '${this.noun.name}'!`)
          );
        }
      });
  }

  public onActivateClick() {
    this.dialog
      .open(ChangeNounStatusConfirmComponent, {
        ...new MatDialogConfig(),
        width: '280px',
        data: {
          noun: this.noun,
          action: 'activate',
        },
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.nounsApiService.activateNoun(this.noun.id).subscribe(
            () => {
              this.messageService.add(`'${this.noun.name}' was activated`);
              this.nounStatusUpdated.emit();
              this.menu.close();
            },
            () => this.messageService.add(`Can't activate noun '${this.noun.name}'!`)
          );
        }
      });
  }

  showMoreItems(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.showMore = true;
  }

  showLessItems(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    this.showMore = false;
  }

  public onUpdateValuesClick() {
    this.dialog
      .open(UpdateValuesComponent, {
        ...new MatDialogConfig(),
        data: {noun: JSON.parse(JSON.stringify(this.noun))},
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.store$.dispatch(
            new UpdateNounAction({
              onSuccess: () => this.nounStatusUpdated.emit(),
              onFailure: e => console.error(e),
              noun: res,
            })
          );
        }
      });
  }

  public onRenameClick() {
    this.dialog
      .open(RenameComponent, {
        ...new MatDialogConfig(),
        width: '280px',
        data: {nounName: `${this.noun.name}`},
      })
      .afterClosed()
      .subscribe(res => {
        if (res && res !== this.noun.name) {
          this.noun.name = res;
          this.store$.dispatch(
            new UpdateNounAction({
              onSuccess: () => this.nounStatusUpdated.emit(),
              onFailure: e => console.error(e),
              noun: this.noun,
            })
          );
        }
      });
  }

  public onDeleteClick() {
    this.dialog
      .open(DeleteNounConfirmComponent, {
        ...new MatDialogConfig(),
        width: '400px',
        data: {
          batchDelete: !!this.noun.batchID,
        },
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.nounsApiService.deleteNoun(this.noun, res?.removeBatch).subscribe(
            () => {
              const message = res?.removeBatch
                ? `Batch with id equal '${this.noun.batchID}' was deleted.`
                : `'${this.noun.name}' was deleted.`;
              this.messageService.add(message);
              this.nounStatusUpdated.emit();
              this.menu.close();
            },
            () => this.messageService.add(`Can't remove '${this.noun.name}' noun`)
          );
        }
      });
  }

  public onEditClick() {
    this.editNoun.emit(JSON.parse(JSON.stringify(this.noun)));
  }

  public onCloneClick() {
    this.cloneNoun.emit(JSON.parse(JSON.stringify(this.noun)));
  }
}
