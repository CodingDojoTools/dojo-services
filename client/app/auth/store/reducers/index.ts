import { ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromAuth from './auth.reducer';
import * as fromHome from './home.reducer';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromHome.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
  status: fromAuth.reducer,
  loginPage: fromHome.reducer,
};
