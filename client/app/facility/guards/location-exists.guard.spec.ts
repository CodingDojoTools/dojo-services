import { TestBed, async, inject } from '@angular/core/testing';

import { LocationExistsGuard } from './location-exists.guard';

describe('LocationExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationExistsGuard]
    });
  });

  it('should ...', inject([LocationExistsGuard], (guard: LocationExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
