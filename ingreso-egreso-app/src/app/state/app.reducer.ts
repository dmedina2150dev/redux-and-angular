import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { uiReducer } from './ui.reducers';


export const APP_REDUCERS: ActionReducerMap<AppState> = {
   ui: uiReducer,
}