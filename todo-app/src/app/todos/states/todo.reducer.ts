import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.model';
import * as actions from './todo.actions';

export const initialState: Todo[] = [
	new Todo('Salvar al mundo'),
	new Todo('Crear pagina web'),
	new Todo('Aprender Java')
];

export const todoReducer = createReducer(
	initialState,
	on(actions.limpiarTodos, (state) => state.filter( todo => !todo.completado)),
	on(actions.crear, (state, { texto }) => [...state, new Todo(texto)]),
	on(actions.toggle, (state, { id }) => {
		return state.map( todo => {
			if ( todo.id === id ) {
				return  {
					... todo,
					completado: !todo.completado
				}	
			} else {
				return todo;
			}
			
		})
	}),
	on(actions.editar, (state, { id, texto }) => {
		return state.map( todo => {
			if ( todo.id === id ) {
				return  {
					... todo,
					texto
				}	
			} else {
				return todo;
			}
			
		})
	}),
	on(actions.borrar, (state, { id }) => state.filter( todo => todo.id !== id ) ),
	on(actions.toggleAll, (state, { completado }) => {
		return state.map( todo => {
			return {
				...todo,
				completado: completado
			}
		})
	}),
);