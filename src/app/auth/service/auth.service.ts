import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedInSubject.asObservable(); // {2}
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(formData) {
    return this.http.post(environment.gw_url + 'auth/login', formData).pipe(
      map(token => {
        localStorage.setItem('token', token['access_token']);
        this.loggedInSubject.next(true);
        this.router.navigate(['/charges']);
      })
    );
  }

  getAuthorizationToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }
}
