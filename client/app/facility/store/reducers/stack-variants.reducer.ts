import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { StackVariantActions, StackVariantActionTypes } from '../actions';

import { StackVariant } from '@facility/models';

export interface StackVariantState extends EntityState<StackVariant> {
  loading: boolean;
  loaded: boolean;
  selectedStackVariants: string[];
}

const adapter: EntityAdapter<StackVariant> = createEntityAdapter<StackVariant>({
  selectId: stackVariant => stackVariant._id,
});

const initialState: StackVariantState = adapter.getInitialState({
  loading: false,
  loaded: false,
  selectedStackVariants: [],
});

export function reducer(state = initialState, action: StackVariantActions) {
  switch (action.type) {
    case StackVariantActionTypes.LoadStackVariants:
      return {
        ...state,
        loading: true,
      };

    case StackVariantActionTypes.LoadStackVariantsSuccess:
      return {
        ...adapter.addMany(action.payload, state),
        loading: false,
        loaded: true,
      };

    case StackVariantActionTypes.LoadStackVariantsFail:
      return {
        ...state,
        loading: false,
        loaded: false,
      };

    case StackVariantActionTypes.CreateStackVariantSuccess:
      return adapter.addOne(action.payload, state);

    case StackVariantActionTypes.UpdateStackVariantSuccess:
      return adapter.updateOne(action.payload, state);

    case StackVariantActionTypes.RemoveStackVariantSuccess:
      return adapter.removeOne(action.payload._id, state);

    case StackVariantActionTypes.SelectStackVariants:
      const { payload: selectedStackVariants } = action;

      return {
        ...state,
        selectedStackVariants,
      };

    case StackVariantActionTypes.ClearStackVariants:
      return initialState;

    default:
      return state;
  }
}

export const getStackVariantEntities = (state: StackVariantState) =>
  state.entities;
export const getStackVariantsLoading = (state: StackVariantState) =>
  state.loading;
export const getStackVariantsLoaded = (state: StackVariantState) =>
  state.loaded;
export const getSelectedStackVariants = (state: StackVariantState) =>
  state.selectedStackVariants;
export const getStackVariantsIds = (state: StackVariantState) => state.ids;
