import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Location } from '@facility/models';
import { LocationService } from '@facility/services';
import { LocationActionTypes } from '../actions';
import * as fromActions from '../actions';

@Injectable()
export class LocationEffects {
  @Effect()
  loadLocations$ = this.actions$.pipe(
    ofType(LocationActionTypes.LoadLocations),
    switchMap(() =>
      this.locationService.index().pipe(
        map(locations => new fromActions.LocationsLoadSuccess(locations)),
        catchError(error => of(new fromActions.LocationsLoadFail(error)))
      )
    )
  );

  @Effect()
  createLocation$ = this.actions$.pipe(
    ofType(LocationActionTypes.CreateLocation),
    map((action: fromActions.LocationCreate) => action.payload),
    switchMap((create: Location) =>
      this.locationService.create(create).pipe(
        map(location => new fromActions.LocationCreateSuccess(location)),
        catchError(error => of(new fromActions.LocationCreateFail(error)))
      )
    )
  );

  @Effect()
  updateLocation$ = this.actions$.pipe(
    ofType(LocationActionTypes.UpdateLocation),
    map((action: fromActions.LocationUpdate) => action.payload),
    switchMap(update =>
      this.locationService.update(update).pipe(
        map(
          location =>
            new fromActions.LocationUpdateSuccess({
              id: location._id,
              changes: location,
            })
        ),
        catchError(error => of(new fromActions.LocationCreateFail(error)))
      )
    )
  );

  @Effect()
  removeLocation$ = this.actions$.pipe(
    ofType(LocationActionTypes.RemoveLocation),
    map((action: fromActions.LocationRemove) => action.payload),
    switchMap(remove =>
      this.locationService.destroy(remove._id).pipe(
        map(location => new fromActions.LocationRemoveSuccess(location)),
        catchError(error => of(new fromActions.LocationRemoveFail(error)))
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly locationService: LocationService
  ) {}
}
