import { Injectable } from '@angular/core';

import { BaseService } from '@app/core/services';

import { Location } from '../models';
import { API } from '@shared/config';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends BaseService<Location> {
  protected readonly base = `${API}/locations`;
}
