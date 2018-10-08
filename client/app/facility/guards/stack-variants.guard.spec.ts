import { TestBed, async, inject } from '@angular/core/testing';

import { StackVariantsGuard } from './stack-variants.guard';

describe('StackVariantsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StackVariantsGuard]
    });
  });

  it('should ...', inject([StackVariantsGuard], (guard: StackVariantsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
