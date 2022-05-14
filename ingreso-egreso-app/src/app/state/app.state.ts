import * as ui from './ui/ui.reducers';
import * as ingresEgres from './ingress-egress/ingress-egress.reducers';

import { User } from '../models/user.model';
import { IngressEgress } from '../models/ingress-egress.model';

export interface AppState {
    ui: ui.State,
    user: User,
}