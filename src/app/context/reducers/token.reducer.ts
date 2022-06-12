import { createReducer, on } from '@ngrx/store';
import { setToken, clearToken } from '../actions/token.actions';
export const initialState = '';

export const tokenReducer = createReducer(
  initialState,
  on(setToken, (state, { access_token }) => access_token),
  on(clearToken, (state) => '')
);
