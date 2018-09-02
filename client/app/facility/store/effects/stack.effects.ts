import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { StackService } from '@facility/services';

import {
  StackActionTypes,
  StacksLoadSuccess,
  StacksLoadFail,
  StackCreate,
  StackCreateFail,
  StackCreateSuccess,
  StackUpdate,
  StackUpdateSuccess,
  StackUpdateFail,
  StackRemove,
  StackRemoveFail,
  StackRemoveSuccess,
} from '@facility/store/actions';

import * as fromRouter from '@app/store';

@Injectable()
export class StackEffects {
  @Effect()
  loadStacks$ = this.actions$.pipe(
    ofType(StackActionTypes.LoadStacks),
    switchMap(() =>
      this.stackService.index().pipe(
        map(stacks => new StacksLoadSuccess(stacks)),
        catchError(error => of(new StacksLoadFail(error)))
      )
    )
  );

  @Effect()
  createStack$ = this.actions$.pipe(
    ofType(StackActionTypes.CreateStack),
    map((action: StackCreate) => action.payload),
    switchMap(create =>
      this.stackService.create(create).pipe(
        map(stack => new StackCreateSuccess(stack)),
        catchError(error => of(new StackCreateFail(error)))
      )
    )
  );

  @Effect()
  updateStack$ = this.actions$.pipe(
    ofType(StackActionTypes.UpdateStack),
    map((action: StackUpdate) => action.payload),
    switchMap(update =>
      this.stackService.update(update).pipe(
        map(
          changes =>
            new StackUpdateSuccess({
              id: changes._id,
              changes,
            })
        ),
        catchError(error => of(new StackUpdateFail(error)))
      )
    )
  );

  @Effect()
  removeStack$ = this.actions$.pipe(
    ofType(StackActionTypes.RemoveStack),
    map((action: StackRemove) => action.payload),
    switchMap(remove =>
      this.stackService.destroy(remove._id).pipe(
        map(stack => new StackRemoveSuccess(stack)),
        catchError(error => of(new StackRemoveFail(error)))
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly stackService: StackService
  ) {}
}
