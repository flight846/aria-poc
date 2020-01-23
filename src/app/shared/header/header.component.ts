import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  links = [
    { link: '/features', name: 'Features' },
    { link: '/testimonials', name: 'Testimonials' },
    { link: '/sign-in', name: 'Sign-in' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
