import { TestBed, async, inject } from '@angular/core/testing';

import { StackExistsGuard } from './stack-exists.guard';

describe('StackExistsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StackExistsGuard]
    });
  });

  it('should ...', inject([StackExistsGuard], (guard: StackExistsGuard) => {
    expect(guard).toBeTruthy();
  }));
});
