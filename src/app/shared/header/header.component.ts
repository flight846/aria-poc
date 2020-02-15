import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  links = [
    { link: '/', name: 'Home' },
    { link: '/charges', name: 'Charges' },
    { link: '/features', name: 'White Clean' },
    { link: '/professional', name: 'Professional' },
    { link: '/settings', name: 'Bookmark & History' },
  ];

  constructor(private auth: AuthService) { }
  isAuthenticated = false;

  ngOnInit() {
    this.getAuthenticated();
  }

  getAuthenticated() {
    this.auth.isAuthenticated()
      .subscribe(hasToken => {
        this.isAuthenticated = hasToken;
      });
  }

}
