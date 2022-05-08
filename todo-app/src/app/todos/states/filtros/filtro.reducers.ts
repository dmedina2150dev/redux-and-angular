import { Action, createReducer, on } from '@ngrx/store';
import { filtrosValidos } from '../../types/filtros-validos';
import * as actions from './filtro.actions';

export const initialStateFiltros: filtrosValidos = 'todos';

export const filtroReducer = createReducer<filtrosValidos, Action>(
    initialStateFiltros,
    on(actions.setFiltro, (state , { filtro }) => filtro )
);