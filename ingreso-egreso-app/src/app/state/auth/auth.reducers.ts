import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as auth from './auth.actions';


export const initialState: User = {
    uid: '',
    nombre: '',
    email: null
}

export const authReducer = createReducer(
    initialState,
    on(auth.setUser, (state, { user }) => ({ ...state,  uid: user.uid, nombre: user.nombre, email: user.email } )),
    on(auth.unSetUser, (state) => ({ ...state, uid: '', nombre: '', email: null })),

);
