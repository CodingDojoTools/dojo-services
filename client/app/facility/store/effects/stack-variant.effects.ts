import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { StackVariantService } from '@facility/services';

import {
  StackVariantActionTypes,
  StackVariantsLoadSuccess,
  StackVariantsLoadFail,
  StackVariantCreate,
  StackVariantCreateFail,
  StackVariantCreateSuccess,
  StackVariantUpdate,
  StackVariantUpdateSuccess,
  StackVariantUpdateFail,
  StackVariantRemove,
  StackVariantRemoveFail,
  StackVariantRemoveSuccess,
} from '@facility/store/actions';

import * as fromRouter from '@app/store';

@Injectable()
export class StackVariantEffects {
  @Effect()
  loadStackVariants$ = this.actions$.pipe(
    ofType(StackVariantActionTypes.LoadStackVariants),
    switchMap(() =>
      this.stackVariantService.index().pipe(
        map(stackVariants => new StackVariantsLoadSuccess(stackVariants)),
        catchError(error => of(new StackVariantsLoadFail(error)))
      )
    )
  );

  @Effect()
  createStackVariant$ = this.actions$.pipe(
    ofType(StackVariantActionTypes.CreateStackVariant),
    map((action: StackVariantCreate) => action.payload),
    switchMap(create =>
      this.stackVariantService.create(create).pipe(
        map(stackVariant => new StackVariantCreateSuccess(stackVariant)),
        catchError(error => of(new StackVariantCreateFail(error)))
      )
    )
  );

  @Effect()
  updateStackVariant$ = this.actions$.pipe(
    ofType(StackVariantActionTypes.UpdateStackVariant),
    map((action: StackVariantUpdate) => action.payload),
    switchMap(update =>
      this.stackVariantService.update(update).pipe(
        map(
          changes =>
            new StackVariantUpdateSuccess({
              id: changes._id,
              changes,
            })
        ),
        catchError(error => of(new StackVariantUpdateFail(error)))
      )
    )
  );

  @Effect()
  removeStackVariant$ = this.actions$.pipe(
    ofType(StackVariantActionTypes.RemoveStackVariant),
    map((action: StackVariantRemove) => action.payload),
    switchMap(remove =>
      this.stackVariantService.destroy(remove._id).pipe(
        map(stackVariant => new StackVariantRemoveSuccess(stackVariant)),
        catchError(error => of(new StackVariantRemoveFail(error)))
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly stackVariantService: StackVariantService
  ) {}
}
