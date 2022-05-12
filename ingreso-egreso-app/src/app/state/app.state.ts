import * as ui from './ui/ui.reducers';

import { User } from '../models/user.model';

export interface AppState {
    ui: ui.State,
    user: User,
 }