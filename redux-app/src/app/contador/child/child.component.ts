import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/interface/app.reducers';
import * as actions from '../count.actions';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styles: [
  ]
})
export class ChildComponent implements OnInit {
  count!: number;
  
  constructor(
    private store: Store<AppState>
  ) {
    this.store.select('count').subscribe( count => this.count = count );
  }

  ngOnInit(): void {
  }

  multiplicar() {
    this.store.dispatch(actions.multiply( { num: 2 }));
  }

  dividir() {
    this.store.dispatch(actions.dividir( { num: 2 }));
  }
}
