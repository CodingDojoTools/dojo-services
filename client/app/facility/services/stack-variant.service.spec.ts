import { TestBed, inject } from '@angular/core/testing';

import { StackVariantService } from './stack-variant.service';

describe('StackVariantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StackVariantService]
    });
  });

  it('should be created', inject([StackVariantService], (service: StackVariantService) => {
    expect(service).toBeTruthy();
  }));
});
