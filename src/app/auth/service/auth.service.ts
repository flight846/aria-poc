import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean;

  constructor(private http: HttpClient) { }

  login(formData) {
    this.http.post(environment.gw_url + 'auth/login', formData)
      .subscribe(data => {
        console.log('Login status: ', data);
      });
  }
}
