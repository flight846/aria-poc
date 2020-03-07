import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root"
})
export class SearchService {
  baseUrl = environment.gw_url + "/cases";
  queryString = "?q=";
  count = 10;
  limit = "?_limit=" + this.count;

  constructor(private http: HttpClient) {}

  getCases(): Observable<any> {
    return this.http.get(this.baseUrl + this.limit);
  }

  getCaseTerms(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any[]>(`${this.baseUrl}?q=${term}`).pipe(
      tap(x =>
        x.length
          ? console.log(`found cases matching "${term}"`)
          : console.log(`no cases matching "${term}"`)
      ),
      catchError(this.handleError<any[]>("cases", []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
