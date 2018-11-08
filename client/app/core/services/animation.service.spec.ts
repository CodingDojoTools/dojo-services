import { TestBed, inject } from '@angular/core/testing';

import { AnimationService } from './animation.service';

describe('AnimationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimationService],
    });
  });

  it('should set route animation type to "NONE" by default', inject(
    [AnimationService],
    (service: AnimationService) => {
      expect(AnimationService.isRouteAnimationsType('NONE')).toBe(true);
    },
  ));

  it('should set route animation type to "ALL"', inject(
    [AnimationService],
    (service: AnimationService) => {
      service.updateRouteAnimationType(true, true);
      expect(AnimationService.isRouteAnimationsType('ALL')).toBe(true);
    },
  ));

  it('should set route animation type to "PAGE"', inject(
    [AnimationService],
    (service: AnimationService) => {
      service.updateRouteAnimationType(true, false);
      expect(AnimationService.isRouteAnimationsType('PAGE')).toBe(true);
    },
  ));

  it('should set route animation type to "ELEMENTS"', inject(
    [AnimationService],
    (service: AnimationService) => {
      service.updateRouteAnimationType(false, true);
      expect(AnimationService.isRouteAnimationsType('ELEMENTS')).toBe(true);
    },
  ));
});
