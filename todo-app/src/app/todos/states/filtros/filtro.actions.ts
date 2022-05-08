import { createAction, props } from '@ngrx/store';
import { filtrosValidos } from '../../types/filtros-validos';



export const setFiltro = createAction(
    '[Filtro] Set Filtro',
    props<{ filtro: filtrosValidos }>()
);