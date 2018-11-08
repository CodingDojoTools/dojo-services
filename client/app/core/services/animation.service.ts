import { Injectable } from '@angular/core';

@Injectable()
export class AnimationService {
  constructor() {}

  private static routeAnimationType: RouteAnimationType = 'NONE';

  static isRouteAnimationsType(type: RouteAnimationType) {
    return AnimationService.routeAnimationType === type;
  }

  updateRouteAnimationType(
    pageAnimations: boolean,
    elementsAnimations: boolean,
  ) {
    AnimationService.routeAnimationType = this.determineRouteType(
      pageAnimations,
      elementsAnimations,
    );
  }

  private determineRouteType(
    page: boolean,
    element: boolean,
  ): RouteAnimationType {
    switch (true) {
      case page && element:
        return 'ALL';
      case page:
        return 'PAGE';
      case element:
        return 'ELEMENTS';
      default:
        return 'NONE';
    }
  }
}

export type RouteAnimationType = 'ALL' | 'PAGE' | 'ELEMENTS' | 'NONE';
