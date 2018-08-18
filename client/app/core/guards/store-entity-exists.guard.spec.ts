import { TestBed, async, inject } from '@angular/core/testing';

import { StoreEntityExistsGuard } from './store-entity-exists.guard';

describe('StoreEntityExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreEntityExistsGuard]
    });
  });

  it('should ...', inject([StoreEntityExistsGuard], (guard: StoreEntityExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
