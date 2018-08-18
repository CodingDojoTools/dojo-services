import { TestBed, async, inject } from '@angular/core/testing';

import { LocationsGuard } from './locations.guard';

describe('LocationsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationsGuard],
    });
  });

  it('should ...', inject([LocationsGuard], (guard: LocationsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
