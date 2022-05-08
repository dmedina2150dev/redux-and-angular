import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './contador/count.actions';
import { AppState } from './core/interface/app.reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  count!: number;
  count2!: number;
  constructor(
    private store: Store<AppState>
  ) {
    // TODO: Aqui escuchando los cambios especificos
    this.store.select('count').subscribe( count => {
      this.count2 = count;
    });


    // TODO: Aqui estoy escuchando todo el state
    this.store.subscribe( state => {
      this.count = state.count;
    });

  }

  ngOnInit(): void {
        
  }

  incrementar() {
    this.store.dispatch( actions.increment() );
  }

  decrementar() {
    this.store.dispatch( actions.decrement() );
  }
}
