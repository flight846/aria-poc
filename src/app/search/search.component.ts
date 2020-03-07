import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SearchService } from './search.service';
import { Case } from '../Case.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  results: Case[];
  terms = [];
  searchBox: string;
  caseOptions$: Observable<string | void | any[]> | null = null;
  private caseTerm = new Subject<string>();
  headers = [];
  isLoading = true;

  constructor(private searchService: SearchService, private fb: FormBuilder) {}

  populateCaseOptions(term: string): void {
    this.caseTerm.next(term);
  }

  addTerm(term: string) {
    this.searchBox = '';
    if (this.terms.indexOf(term) === -1) {
      if (this.terms.length < 7) {
        this.terms.push(term);
        console.log("Added: ", term);
      }
    }
    this.caseTerm.next('');
  }

  deleteTerm(term: string) {
    console.log(term);
  }

  ngOnInit() {
    this.caseOptions$ = this.caseTerm.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.searchService.getCaseTerms(term))
    );

    this.form = this.fb.group({
      search: ["", [Validators.required]]
    });
  }
}
