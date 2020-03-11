import { Component, OnInit } from '@angular/core';
import { Subject, Observable, pipe } from 'rxjs';
import { SearchService } from './search.service';
import { Case } from '../Case.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  results: any[] = [];
  terms = [];
  searchBox: string;
  searchBy = "code";
  searchOptions$: Observable<string | void | any[]> | null = null;
  private searchTerm = new Subject<string>();
  headers = [];
  isLoading = true;

  constructor(private searchService: SearchService, private fb: FormBuilder) {}

  ngOnInit() {
    this.searchOptions$ = this.searchTerm.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        if (this.searchBy === "caseId") {
          return this.searchService.getCaseTerms(term);
        } else if (this.searchBy === "code") {
          return this.searchService.getCodeTerms(term);
        }
      })
    );

    this.form = this.fb.group({
      search: ["", [Validators.required]]
    });
  }

  populatesearchOptions(term: string): void {
    this.searchTerm.next(term);
  }

  addTerm(term: string) {
    this.searchBox = "";
    if (this.terms.indexOf(term) === -1) {
      if (this.terms.length < 8) {
        this.terms.push(term);
        console.log("Added: ", term);
        console.log("Length: ", this.terms.length);
      }
    }
    this.searchTerm.next("");
  }

  deleteTerm(term: string) {
    this.terms = this.terms.filter(t => t !== term);
    console.log(this.terms);
  }

  onSearch() {
    console.log('Terms: ', this.terms);
    if (this.terms.length > 0) {
      this.terms.forEach(term => {
        this.searchService.getCasesByCode(term)
            .subscribe(
              cases => this.results = this.results.concat(cases)
            );
      });
      this.terms = [];
    }
  }
}
