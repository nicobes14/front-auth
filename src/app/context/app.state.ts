import { ActionReducerMap } from '@ngrx/store';
import { UserModel } from '../core/models/user.model';
import { tokenReducer } from './reducers/token.reducer';
import { userReducer } from './reducers/user.reducer';

export interface AppState {
  access_token: string;
  user: UserModel;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  access_token: tokenReducer,
  user: userReducer,
};
