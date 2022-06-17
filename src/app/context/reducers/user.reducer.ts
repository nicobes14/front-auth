import { UserModel } from './../../core/models/user.model';
import { createReducer, on } from '@ngrx/store';
import { setUser, clearUser, updateUser } from '../actions/user.actions';
export const initialState: UserModel = {
  email: '',
  bio: '',
  photo: '',
  name: '',
  phone: '',
};

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, user) => user),
  on(clearUser, (state) => initialState),
  on(updateUser, (state, user) => user)
);
