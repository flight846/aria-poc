import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  links = [
    { link: "/", name: "Home" },
    { link: "/charges", name: "Charges" },
    { link: "/features", name: "White Clean" },
    { link: "/professional", name: "Professional" },
    { link: "/settings", name: "Bookmark & History" }
  ];

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout(); // {3}
  }
}
