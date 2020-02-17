import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  backgroundUrl = '../../assets/images/login.png';
  isLoading = false;
  isAuthenticated = false;
  form: FormGroup;
  errors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.removeItem('token');
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.isLoading = true;
    const formObj = this.form.value;

    if (Object.entries(this.form.value).length > 0) {
      this.authService
        .login(formObj)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigateByUrl('/search');
          },
          error => {
            this.errors.push(error.error.message);
            this.isLoading = false;
          }
        );
    }
  }
}
