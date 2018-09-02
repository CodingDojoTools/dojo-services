import { Action } from '@ngrx/store';

import { Resource } from './resource.model';

export interface ActionPayload<T extends Resource> extends Action {
  payload: T | T[];
}
