import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectUser = createFeatureSelector<string>('user');
