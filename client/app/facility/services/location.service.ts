import { Injectable } from '@angular/core';

import { BaseService } from '@app/core/services';
import { Location } from '@facility/models';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends BaseService<Location> {
  protected readonly resource = 'locations';
}
