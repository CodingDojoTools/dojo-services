import { TestBed, async, inject } from '@angular/core/testing';

import { StackVariantExistsGuard } from './stack-variant-exists.guard';

describe('StackVariantExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StackVariantExistsGuard]
    });
  });

  it('should ...', inject([StackVariantExistsGuard], (guard: StackVariantExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
