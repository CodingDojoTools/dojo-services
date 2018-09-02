import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Service, Resource } from '@app/core';
import { API } from '@shared/config';
import { debug } from '@app/utils';

@Injectable()
export abstract class BaseService<T extends Resource> implements Service<T> {
  protected abstract resource: string;

  constructor(protected readonly http: HttpClient) {}

  index(): Observable<T[]> {
    debug(`Requesting resources from index using ${this.url}`);
    return this.http.get<T[]>(this.url);
  }

  show(resourceID: string): Observable<T> {
    debug(`Requesting resources from show using ${this.url} and ${resourceID}`);

    return this.http.get<T>(`${this.url}/${resourceID}`);
  }

  update(resource: T): Observable<T> {
    debug(
      `Requesting update resources using ${this.url} and ${resource._id}`,
      resource
    );
    return this.http.put<T>(`${this.url}/${resource._id}`, resource);
  }

  create(resource: T): Observable<T> {
    return this.http.put<T>(this.url, resource);
  }

  destroy(resourceID: string): Observable<T> {
    return this.http.delete<T>(`${this.url}/${resourceID}`);
  }

  protected get url(): string {
    return `${API}/${this.resource}`;
  }
}
