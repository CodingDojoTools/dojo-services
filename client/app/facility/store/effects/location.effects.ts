import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { Location } from '@facility/models';
import { LocationService } from '@facility/services';

import {
  LocationActionTypes,
  LocationsLoadSuccess,
  LocationsLoadFail,
  LocationCreate,
  LocationCreateFail,
  LocationCreateSuccess,
  LocationUpdate,
  LocationUpdateFail,
  LocationUpdateSuccess,
  LocationRemove,
  LocationRemoveFail,
  LocationRemoveSuccess,
} from '@facility/store/actions';

@Injectable()
export class LocationEffects {
  @Effect()
  loadLocations$ = this.actions$.pipe(
    ofType(LocationActionTypes.LoadLocations),
    switchMap(() =>
      this.locationService.index().pipe(
        map(locations => new LocationsLoadSuccess(locations)),
        catchError(error => of(new LocationsLoadFail(error)))
      )
    )
  );

  @Effect()
  createLocation$ = this.actions$.pipe(
    ofType(LocationActionTypes.CreateLocation),
    map((action: LocationCreate) => action.payload),
    switchMap((create: Location) =>
      this.locationService.create(create).pipe(
        map(location => new LocationCreateSuccess(location)),
        catchError(error => of(new LocationCreateFail(error)))
      )
    )
  );

  @Effect()
  updateLocation$ = this.actions$.pipe(
    ofType(LocationActionTypes.UpdateLocation),
    map((action: LocationUpdate) => action.payload),
    switchMap(update =>
      this.locationService.update(update).pipe(
        map(
          location =>
            new LocationUpdateSuccess({
              id: location._id,
              changes: location,
            })
        ),
        catchError(error => of(new LocationUpdateFail(error)))
      )
    )
  );

  @Effect()
  removeLocation$ = this.actions$.pipe(
    ofType(LocationActionTypes.RemoveLocation),
    map((action: LocationRemove) => action.payload),
    switchMap(remove =>
      this.locationService.destroy(remove._id).pipe(
        map(location => new LocationRemoveSuccess(location)),
        catchError(error => of(new LocationRemoveFail(error)))
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly locationService: LocationService
  ) {}
}
