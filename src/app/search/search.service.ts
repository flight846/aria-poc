import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl = 'https://aria-poc-server.herokuapp.com/cases';
  queryString = '?q=';
  count = 10;
  limit = '?_limit=' + this.count;

  constructor(private http: HttpClient) {}

  getCases(): Observable<any> {
    return this.http.get(this.baseUrl + this.limit);
  }
}
