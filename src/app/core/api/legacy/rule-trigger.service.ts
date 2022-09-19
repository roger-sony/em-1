import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../../services/message.service';
import {WEBROOT} from '../../../app.constants';
import {TaskRuleTriggerDto} from '../dto/task-rule-trigger.dto';
import {NounRuleTriggerDto} from '../dto/noun-rule-trigger.dto';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class RuleTriggerService {
  private ruleScheduleUrl = `${WEBROOT}/ruleSchedules`;
  private taskRuleTriggerUrl = `${WEBROOT}/taskRuleTriggers`;
  private nounRuleTriggerUrl = `${WEBROOT}/nounRuleTriggers`;
  private dTableUrl = `${WEBROOT}/dtable`;

  constructor(private http: HttpClient, private messageService: MessageService) {}

  private log(message: string) {
    this.messageService.add(message);
  }

  /**
   * Handle any Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send errors to remote logging infrastructure
      console.error(error);
      this.log(`Error: Something went wrong while trying to ${operation}. Please try again.`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /*****************************************************************************
                    Schedule (One-Time/Recurring) Rule CRUD
  *****************************************************************************/
  getScheduledRules(): Observable<any> {
    const url = `${this.ruleScheduleUrl}/sorted/displayname`;
    return this.http.get(url).pipe(
      // tap(facts => this.log(`fetched scheduled-rules`)),
      catchError(this.handleError('get Scheduled Rules', []))
    );
  }

  getScheduledRule(id: string): Observable<any> {
    const url = `${this.ruleScheduleUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched scheduled-rule id=${id}`)),
      catchError(this.handleError('get Scheduled Rule', [])) // The real request returns array w/ single fact
    );
  }

  addScheduledRule(scheduledRule: any): Observable<any> {
    const url = `${this.ruleScheduleUrl}/addScheduledRule`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, scheduledRule, httpOptions).pipe(
      tap((r: any) => this.log(`Success! Your Rule Trigger has been added.`)),
      catchError(this.handleError<any>('add Scheduled Rule'))
    );
  }

  updateScheduledRule(scheduledRule: any): Observable<any> {
    const url = `${this.ruleScheduleUrl}/${scheduledRule._id}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(url, scheduledRule, httpOptions).pipe(
      tap(_ => this.log(`Success! Your Rule Trigger has been updated.`)),
      catchError(this.handleError<any>('update Scheduled Rule'))
    );
  }

  deleteScheduledRule(id: string): Observable<any> {
    const url = `${this.ruleScheduleUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`Success! Your Rule Trigger has been deleted.`)),
      catchError(this.handleError('delete Scheduled Rule', [])) //TODO: Determine appropriate data type to mimic response
    );
  }

  deleteEditedRule(id: string): Observable<any> {
    const url = `${this.ruleScheduleUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError('delete Scheduled Rule', [])) //TODO: Determine appropriate data type to mimic response
    );
  }

  /*****************************************************************************
                            Task Rule Trigger CRUD
  *****************************************************************************/
  getTaskRuleTriggers(): Observable<any> {
    const url = `${this.taskRuleTriggerUrl}`;
    return this.http.get(url).pipe(
      // mapping ruleId field to rule, to be consistent w/ schedule triggers
      map((triggers: TaskRuleTriggerDto[]) =>
        triggers.map((t: any) => {
          t['rule'] = t['ruleId'];
          return t;
        })
      ),
      catchError(this.handleError('get Task Rule Triggers', []))
    );
  }

  getTaskRuleTrigger(id: string): Observable<any> {
    const url = `${this.taskRuleTriggerUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched scheduled-rule id=${id}`)),
      catchError(this.handleError('get Task Rule Trigger', []))
    );
  }

  addTaskRuleTrigger(ruleTrigger: any): Observable<any> {
    const url = `${this.taskRuleTriggerUrl}/addTaskRuleTrigger`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, ruleTrigger, httpOptions).pipe(
      tap((r: any) => this.log(`Success! Your Rule Trigger has been added.`)),
      catchError(this.handleError<any>('add Task Rule Trigger'))
    );
  }

  updateTaskRuleTrigger(taskRuleTrigger: any): Observable<any> {
    const url = `${this.taskRuleTriggerUrl}/${taskRuleTrigger._id}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(url, taskRuleTrigger, httpOptions).pipe(
      tap(_ => this.log(`Success! Your Rule Trigger has been updated.`)),
      catchError(this.handleError<any>('update Task Rule Trigger'))
    );
  }

  deleteTaskRuleTrigger(id: string): Observable<any> {
    const url = `${this.taskRuleTriggerUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`Success! Your Rule Trigger has been deleted.`)),
      catchError(this.handleError('delete Task Rule Trigger', []))
    );
  }

  deleteEditedTaskRuleTrigger(id: string): Observable<any> {
    const url = `${this.taskRuleTriggerUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError('delete Task Rule Trigger', [])));
  }

  /*****************************************************************************
                            Noun Rule Trigger CRUD
  *****************************************************************************/
  getNounRuleTriggers(): Observable<any> {
    const url = `${this.nounRuleTriggerUrl}`;
    return this.http.get(url).pipe(
      // mapping ruleId field to rule, to be consistent w/ schedule triggers
      map((triggers: NounRuleTriggerDto[]) =>
        triggers.map((t: any) => {
          t['rule'] = t['ruleId'];
          return t;
        })
      ),
      catchError(this.handleError('get Noun Rule Triggers', []))
    );
  }

  getNounRuleTrigger(id: string): Observable<any> {
    const url = `${this.nounRuleTriggerUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched scheduled-rule id=${id}`)),
      catchError(this.handleError('get Noun Rule Trigger', []))
    );
  }

  getNounRuleTriggerBySubcategory(subcategory: string): Observable<any> {
    // NOTE: Hack because Angular can't encode slashes correctly.
    // See issue: https://github.com/angular-ui/ui-router/issues/2598
    const encodedName = encodeURI(subcategory).replace('/', '%2F');
    const url = `${this.nounRuleTriggerUrl}/nounSubcategory/${encodedName}`;
    //TODO: Delete once ruleTriggers API is ready
    // return of([
    //   {
    //     _id: 'sdkfjweoisovkjdsl',
    //     ruleId: '5bc4be149dbf8b4234855745',
    //     saveReport: true,
    //     triggerActions: true,
    //     nounSubcategory: subcategory
    //   },
    //   {
    //     _id: '3847sdjfsjr32r8s',
    //     ruleId: '5bcb91c29dbf8b4234855850',
    //     saveReport: false,
    //     triggerActions: true,
    //     nounSubcategory: subcategory
    //   }
    // ]);
    // TODO: Uncomment this once API endpoint is ready.
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched noun rule triggers`)),
      catchError(this.handleError('get Noun Rule Trigger', []))
    );
  }

  addNounRuleTrigger(ruleTrigger: any): Observable<any> {
    const url = `${this.nounRuleTriggerUrl}/addNounRuleTrigger`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, ruleTrigger, httpOptions).pipe(
      tap((r: any) => this.log(`Success! Your Rule Trigger has been added.`)),
      catchError(this.handleError<any>('add Noun Rule Trigger'))
    );
  }

  updateNounRuleTrigger(nounRuleTrigger: any): Observable<any> {
    const url = `${this.nounRuleTriggerUrl}/${nounRuleTrigger._id}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(url, nounRuleTrigger, httpOptions).pipe(
      tap(_ => this.log(`Success! Your Rule Trigger has been updated.`)),
      catchError(this.handleError<any>('update Noun Rule Trigger'))
    );
  }

  deleteNounRuleTrigger(id: string): Observable<any> {
    const url = `${this.nounRuleTriggerUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`Success! Your Rule Trigger has been deleted.`)),
      catchError(this.handleError('delete Noun Rule Trigger', []))
    );
  }

  deleteEditedNounRuleTrigger(id: string): Observable<any> {
    const url = `${this.nounRuleTriggerUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.handleError('delete Noun Rule Trigger', [])));
  }

  /*****************************************************************************
                            Run On Demand/Preview
  *****************************************************************************/
  runDTableOnDemand(id: string, saveReport: boolean, triggerActions: boolean): Observable<any> {
    const url = `${this.dTableUrl}/onDemand/${id}/false/${saveReport}/${triggerActions}`;
    return this.http.get(url).pipe(
      tap(_ =>
        this.log(
          `Success! Your decision table has been run. Any actions triggered by your decision table have been executed.`
        )
      ),
      catchError(this.handleError('run Rule on demand', []))
    );
  }

  getRulePreview(id: string): Observable<any> {
    const url = `${this.dTableUrl}/ondemand/${id}/true/false/false`;
    return this.http.get(url).pipe(
      tap(_ => this.log(`Success! See preview.`)),
      catchError(this.handleError('run Rule preview', []))
    );
  }
}
