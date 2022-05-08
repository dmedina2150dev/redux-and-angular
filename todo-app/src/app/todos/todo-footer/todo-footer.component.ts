import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.states';
import * as actions from '../states/filtros/filtro.actions';
import { limpiarTodos } from '../states/todo.actions';

import { filtrosValidos } from '../types/filtros-validos';

@Component({
	selector: 'app-todo-footer',
	templateUrl: './todo-footer.component.html',
	styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

	filtroActual: filtrosValidos = 'todos';
	filtros: filtrosValidos[] = ['todos', 'completados', 'pendientes'];

	pendientes: number = 0;

	constructor(
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		// this.store.select('filtros')
		// 	.subscribe( filtro => this.filtroActual = filtro );

		this.store.subscribe( state => {
			this.filtroActual = state.filtro;
			this.pendientes = state.todos.filter( todo => !todo.completado ).length;
		});
	}

	changeFilter(filtro: filtrosValidos) {
		this.store.dispatch( actions.setFiltro( { filtro } ) );
	}

	limpiarCompletados() {
		this.store.dispatch( limpiarTodos() );
	}

}
