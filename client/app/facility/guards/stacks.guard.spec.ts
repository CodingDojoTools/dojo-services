import { TestBed, async, inject } from '@angular/core/testing';

import { StacksGuard } from './stacks.guard';

describe('StacksGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StacksGuard]
    });
  });

  it('should ...', inject([StacksGuard], (guard: StacksGuard) => {
    expect(guard).toBeTruthy();
  }));
});
