import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectToken = createFeatureSelector<string>('access_token');
