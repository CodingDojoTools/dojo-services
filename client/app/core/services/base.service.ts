import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { debug } from '@app/utils';
@Injectable()
export abstract class BaseService<T extends Resource> {
  protected abstract base: string;

  constructor(protected readonly http: HttpClient) {}

  index(): Observable<T[]> {
    debug(`Requesting resources from index using ${this.base}`);
    return this.http.get<T[]>(this.base);
  }

  show(resourceID: string): Observable<T> {
    debug(
      `Requesting resources from show using ${this.base} and ${resourceID}`
    );

    return this.http.get<T>(`${this.base}/${resourceID}`);
  }

  update(resource: T): Observable<T> {
    return this.http.put<T>(`${this.base}/${resource.id}`, resource);
  }

  create(resource: T): Observable<T> {
    return this.http.put<T>(this.base, resource);
  }

  destroy(resourceID: string): Observable<T> {
    return this.http.delete<T>(`${this.base}/${resourceID}`);
  }
}

export interface Resource {
  id?: string;
  _id?: string;
}
