import { createReducer, on } from '@ngrx/store';
import { IngressEgress } from 'src/app/models/ingress-egress.model';
import * as itemsActions from './ingress-egress.actions';

export interface State {
    items: IngressEgress[]
};

const initialState: State = {
    items: []
};

export const ingressEgressReducer = createReducer(
    initialState,
    on( itemsActions.setItems, (state, { items }) => ( {...state, items: [ ...items ] }) ),
    on( itemsActions.unSetItems, (state) => ({ ... state, items: [] }) )
);