import { createAction, props } from '@ngrx/store';
import { UserModel } from 'src/app/core/models/user.model';

export const setUser = createAction(
  '[User Component] SET_USER',
  props<UserModel>()
);

export const clearUser = createAction('[User Component] CLEAR_USER');
