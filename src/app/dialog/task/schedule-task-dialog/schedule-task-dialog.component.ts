import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {CadenceForm} from 'src/app/core/model/form/cadence-form';
import {Paragraph} from 'src/app/core/model/paragraph';
import {selectParagraphById} from 'src/app/core/store/paragraphs/paragraphs.selector';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {MessageService} from 'src/app/services/message.service';
import {DiscardDialogComponent} from 'src/app/shared/dialog/discard/discard-dialog.component';
import {DialogService} from '../../dialog.service';
import {GetParagraphsAction, UpdateParagraphAction} from './../../../core/store/paragraphs/paragraphs.action';

@Component({
  selector: 'schedule-task-dialog',
  templateUrl: './schedule-task-dialog.component.html',
  styleUrls: ['./schedule-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleTaskDialogComponent implements OnInit, OnDestroy {
  public valid$: Observable<boolean>;
  public paragraphId$: Observable<string>;
  public paragraph$: Observable<Paragraph>;

  public cadenceForm$ = new BehaviorSubject<CadenceForm>(null);
  public edited$ = new BehaviorSubject<boolean>(false);
  public cadences$ = new BehaviorSubject<CadenceForm[]>([]);

  private subscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
    private dialogService: DialogService,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.paragraphId$ = this.store$.pipe(select(selectRouterParam('paragraphId')));
    this.paragraph$ = this.observeParagraphId();

    this.valid$ = this.observeCadenceForm();

    this.subscription = this.subscribeToParagraph();
  }

  private subscribeToParagraph(): Subscription {
    return this.paragraph$.subscribe(paragraph => {
      if (paragraph) {
        this.cadences$.next(paragraph.cadence);
      }
    });
  }

  private observeCadenceForm(): Observable<boolean> {
    return this.cadenceForm$.pipe(
      map(form => {
        return !form?.startDateTime;
      })
    );
  }

  private observeParagraphId(): Observable<Paragraph> {
    return this.paragraphId$.pipe(switchMap(id => this.store$.pipe(select(selectParagraphById(id)))));
  }

  public onListChange(cadences: CadenceForm[]) {
    this.edited$.next(true);
    this.cadences$.next(cadences);
  }

  public onSave() {
    combineLatest([this.paragraph$, this.cadences$, this.edited$])
      .pipe(take(1))
      .subscribe(([paragraph, cadence, edited]) => {
        const paragraphChange = {...paragraph, cadence};
        this.store$.dispatch(
          new UpdateParagraphAction({
            paragraphId: paragraph.id,
            paragraphChange,
            edited,
            onSuccess: () => this.onEditParagraphSuccess(),
            onFailure: () => this.onEditParagraphFailure(),
          })
        );
      });
  }

  public onCadenceFormValueChange(cadenceForm: CadenceForm) {
    this.cadenceForm$.next(cadenceForm);
  }

  public onAdd() {
    this.edited$.next(true);
    combineLatest([this.cadenceForm$, this.cadences$])
      .pipe(take(1))
      .subscribe(([cadenceForm, cadences]) => {
        const cadenceArr = [...cadences];
        cadenceArr.push({...cadenceForm, id: this.getUniqueId(4)});
        this.cadences$.next(cadenceArr);
        this.onClearCadenceForm();
      });
  }

  public onReset() {
    this.onClearCadenceForm();
  }

  public onClose() {
    this.edited$.pipe(take(1)).subscribe(edited => {
      if (edited) {
        const dialog = this.dialog.open(DiscardDialogComponent, {
          backdropClass: 'oph-backdrop',
          panelClass: 'oph-dialog',
        });
        dialog.afterClosed().subscribe(confirmed => {
          if (confirmed) {
            this.dialogService.closeDialog();
          }
        });
      } else {
        this.dialogService.closeDialog();
      }
    });
  }

  public onClearCadenceForm() {
    this.cadenceForm$.next({startDateTime: null, repetition: ''});
  }

  private onEditParagraphSuccess() {
    this.messageService.add('Success! This Paragraph has been scheduled');
    this.store$.dispatch(new GetParagraphsAction({}));
    this.dialogService.closeDialog();
  }

  private onEditParagraphFailure() {
    this.messageService.add('Error: Paragraph creation has failed.');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}
