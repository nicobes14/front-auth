import { ActionReducerMap } from '@ngrx/store';
import { tokenReducer } from './reducers/token.reducer';

export interface AppState {
  access_token: string;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  access_token: tokenReducer,
};
