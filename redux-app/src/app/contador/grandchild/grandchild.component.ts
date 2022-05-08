import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/interface/app.reducers';
import { reset } from '../count.actions';

@Component({
  selector: 'app-grandchild',
  templateUrl: './grandchild.component.html',
  styles: [
  ]
})
export class GrandchildComponent implements OnInit {
  count!: number;
  
  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('count').subscribe( count => this.count = count);
  }

  ngOnInit(): void {
  }

  reset() {
    this.store.dispatch( reset() );
  }

}
