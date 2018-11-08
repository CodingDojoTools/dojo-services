import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { LocalStorageService } from '@app/core/services';

const actions = [INIT.toString(), UPDATE.toString()];

export function initState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    const newState = reducer(state, action);

    if (actions.includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return newState;
  };
}
