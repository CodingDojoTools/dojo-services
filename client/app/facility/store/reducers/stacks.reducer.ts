import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { StackActions, StackActionTypes } from '../actions';

import { Stack } from '@facility/models';

export interface StackState extends EntityState<Stack> {
  loading: boolean;
  loaded: boolean;
  selectedStacks: string[];
}

const adapter = createEntityAdapter<Stack>({
  selectId: stack => stack._id,
});

const initialState: StackState = adapter.getInitialState({
  loading: false,
  loaded: false,
  selectedStacks: [],
});

export function reducer(state = initialState, action: StackActions) {
  switch (action.type) {
    case StackActionTypes.LoadStacks:
      return {
        ...state,
        loading: true,
      };

    case StackActionTypes.LoadStacksSuccess:
      return {
        ...adapter.addMany(action.payload, state),
        loading: false,
        loaded: true,
      };

    case StackActionTypes.LoadStacksFail:
      return {
        ...state,
        loading: false,
        loaded: false,
      };

    case StackActionTypes.CreateStackSuccess:
      return adapter.addOne(action.payload, state);

    case StackActionTypes.UpdateStackSuccess:
      return adapter.updateOne(action.payload, state);

    case StackActionTypes.RemoveStackSuccess:
      return adapter.removeOne(action.payload._id, state);

    case StackActionTypes.SelectStacks:
      const { payload: selectedStacks } = action;

      return {
        ...state,
        selectedStacks,
      };

    case StackActionTypes.ClearStacks:
      return initialState;

    default:
      return state;
  }
}

export const getStackEntities = (state: StackState) => state.entities;
export const getStacksLoading = (state: StackState) => state.loading;
export const getStacksLoaded = (state: StackState) => state.loaded;
export const getSelectedStacks = (state: StackState) => state.selectedStacks;
export const getStacksIds = (state: StackState) => state.ids;
