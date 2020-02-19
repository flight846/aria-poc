import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchService } from './search.service';
import { Case } from '../Case.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  results: Case[];
  headers = [];
  isLoading = true;

  constructor(private searchService: SearchService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      search: ['', [Validators.required]]
    });
  }
}
