import { Component, OnInit, Input } from '@angular/core';
import { Case } from 'src/app/Case.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() results: any[];
  @Input() headers = [];

  constructor() { }

  ngOnInit() {
    console.log('Headers:', this.headers);
  }
}
