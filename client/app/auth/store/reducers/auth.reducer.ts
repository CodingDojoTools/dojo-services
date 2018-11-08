import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { AuthActions, AuthActionTypes } from '../actions/';
import { User } from '@auth/models';

export interface State {
  user: User;
  token: string;
}

export const initialState: State = {
  user: null,
  token: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case AuthActionTypes.LogoutFailure:
    case AuthActionTypes.LoginFailure:
    case AuthActionTypes.LogoutSuccess: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) =>
  state.user !== null && state.token !== null;

export const getUser = (state: State) => state.user;
export const getToken = (state: State) => state.token;
