import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { AuthActions, AuthActionTypes } from '../actions/';
import { User } from '@auth/models';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.CurrentUserSuccess:
    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        user: action.payload.user,
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

export const getLoggedIn = (state: State) => state.user !== null;
export const getUser = (state: State) => state.user;
