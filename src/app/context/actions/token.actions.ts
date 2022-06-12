import { createAction, props } from '@ngrx/store';

export const setToken = createAction(
  '[Counter Component] SET_TOKEN',
  props<{ access_token: string }>()
);

export const clearToken = createAction('[Counter Component] CLEAR_TOKEN');
