import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { UserActions, UserActionTypes } from '../actions';

import { User } from '@auth/models';

export interface UserState extends EntityState<User> {
  loading: boolean;
  loaded: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: user => user._id,
});

export const initialState: UserState = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.LoadUsers:
      return {
        ...state,
        loading: true,
      };
    case UserActionTypes.LoadUsersFail:
      return {
        ...state,
        loading: false,
        loaded: false,
      };

    case UserActionTypes.LoadUsersSuccess:
      return {
        ...adapter.addMany(action.payload, state),
        loading: false,
        loaded: true,
      };
    case UserActionTypes.UpdateUserSuccess:
      return adapter.updateOne(action.payload, state);

    case UserActionTypes.RemoveUserSuccess:
      return adapter.removeOne(action.payload._id, state);

    case UserActionTypes.ClearUsers:
      return initialState;

    default:
      return state;
  }
}

export const getUserEntities = (state: UserState) => state.entities;
export const getUsersLoading = (state: UserState) => state.loading;
export const getUsersLoaded = (state: UserState) => state.loaded;
export const getUsersIds = (state: UserState) => state.ids;
