import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducers';
import { ingressEgressReducer } from './ingress-egress/ingress-egress.reducers';
import { uiReducer } from './ui/ui.reducers';


export const APP_REDUCERS: ActionReducerMap<AppState> = {
   ui: uiReducer,
   user: authReducer,
}