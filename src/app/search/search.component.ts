import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from './search.service';
import { Case } from '../Case.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results: Case[];
  headers = [];
  isLoading = true;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    console.log(this.isLoading);
    this.searchService.getCases()
      .subscribe(data => {
        this.isLoading = true;
        this.results = data;
        Object.keys(data[0]).forEach(key => {
          this.headers.push(key);
        });
        this.isLoading = false;
      });
  }

}
