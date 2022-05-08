import { Action, createReducer, on } from "@ngrx/store";
import { decrement, dividir, increment, multiply } from "./count.actions";

// TODO: Como se haboa ehco en los ejemplos
// export function countReducer( state: number = 10, action: Action ) {
    
//     switch (action.type) {
//         case increment.type:
//             return state + 1;
//         case decrement.type:
//                 return state - 1;
//         default:
//             return state;
//     }
// }

export const initialState = 20;

const _countReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(multiply, ( state, { num } ) =>  state * num ),
  on(dividir, ( state, { num } ) =>  state / num ),
  
);

export function countReducer(state: any, action: Action) {
    return _countReducer(state, action);
}