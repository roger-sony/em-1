import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {WEBROOT} from '../../../app.constants';
import {MessageService} from '../../../services/message.service';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipeUrl = `${WEBROOT}/recipes`;

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

  getRecipes(): Observable<any> {
    return this.http.get(this.recipeUrl).pipe(
      // tap(recipes => this.log(`fetched recipes`)),
      catchError(this.handleError('get Recipes', []))
    );
  }

  getRecipe(id: string): Observable<any> {
    const url = `${this.recipeUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched recipe id=${id}`)),
      catchError(this.handleError('get Recipe', [])) // The real request returns array w/ single task
    );
  }

  addRecipe(recipe: any): Observable<any> {
    const url = `${this.recipeUrl}/addrecipe`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, recipe, httpOptions).pipe(
      tap((r: any) => this.log(`Success! Your recipe has been created.`)),
      catchError(this.handleError<any>('add Recipe'))
    );
  }

  updateRecipe(recipe: any): Observable<any> {
    const url = `${this.recipeUrl}/${recipe._id}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(url, recipe, httpOptions).pipe(
      tap(_ => this.log(`Success! Your recipe has been updated.`)),
      catchError(this.handleError<any>('update Recipe'))
    );
  }

  deleteRecipe(id: string): Observable<any> {
    const url = `${this.recipeUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`Success! Your recipe has been deleted.`)),
      catchError(this.handleError('delete Recipe', [])) //TODO: Determine appropriate data type to mimic response
    );
  }
}
