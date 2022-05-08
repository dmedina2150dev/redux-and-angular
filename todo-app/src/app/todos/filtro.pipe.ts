import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';
import { filtrosValidos } from './types/filtros-validos';

@Pipe({
	name: 'filterTodo'
})
export class FiltroPipe implements PipeTransform {

	transform(todos: Todo[], filtro: filtrosValidos): any {

		switch (filtro) {
     	 	case 'completados':
				return todos.filter( todo => todo.completado );
			case 'pendientes':
				return todos.filter( todo => !todo.completado );
			default:
				return todos;
		}
	}

}
