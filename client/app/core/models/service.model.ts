import { Observable } from 'rxjs';

export interface Service<T> {
  index(): Observable<T[]>;
  create(resource: T): Observable<T>;
  show(id: string): Observable<T>;
  update(resource: T): Observable<T>;
  destroy(id: string): Observable<T>;
}
