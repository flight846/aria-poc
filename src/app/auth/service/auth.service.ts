import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

import { map } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  login(formData) {
    return this.http.post(environment.gw_url + 'auth/login', formData)
      .pipe(map(token => {
        localStorage.setItem('token', token['access_token']);
      }));
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (token === null) {
      return observableOf(false);
    }
    return observableOf(true);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
