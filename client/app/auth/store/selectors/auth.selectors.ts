import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';
import * as fromHome from '../reducers/home.reducer';

export const selectAuthState = createFeatureSelector<fromFeature.AuthState>(
  'auth'
);

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: fromFeature.AuthState) => state.status
);
export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromAuth.getLoggedIn
);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: fromFeature.AuthState) => state.loginPage
);
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromHome.getError
);
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromHome.getPending
);
