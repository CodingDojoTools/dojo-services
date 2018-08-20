import { TestBed, async, inject } from '@angular/core/testing';

import { StoreEntitiesGuard } from './store-entities.guard';

describe('StoreEntitiesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreEntitiesGuard]
    });
  });

  it('should ...', inject([StoreEntitiesGuard], (guard: StoreEntitiesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
