import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducers';
import { uiReducer } from './ui/ui.reducers';


export const APP_REDUCERS: ActionReducerMap<AppState> = {
   ui: uiReducer,
   user: authReducer
}