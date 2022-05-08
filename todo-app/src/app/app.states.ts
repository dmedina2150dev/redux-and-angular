import { ActionReducerMap } from "@ngrx/store";
import { Todo } from "./todos/models/todo.model";
import { filtroReducer } from "./todos/states/filtros/filtro.reducers";
import { todoReducer } from "./todos/states/todo.reducer";
import { filtrosValidos } from "./todos/types/filtros-validos";

export interface AppState {
    todos: Todo[],
    filtro: filtrosValidos,
}

export const APP_REDUCERS: ActionReducerMap<AppState> = {
    todos: todoReducer,
    filtro: filtroReducer
}