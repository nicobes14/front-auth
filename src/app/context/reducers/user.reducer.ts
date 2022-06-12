import { UserModel } from './../../core/models/user.model';
import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser } from '../actions/user.actions';
export const initialState: UserModel = {
  name: '',
  email: '',
  bio: '',
  image: '',
  phone: '',
};

export const tokenReducer = createReducer(
  initialState,
  on(setUser, (state, user) => user),
  on(clearUser, (state) => initialState)
);
