import { NavigationEnd, Router } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { environment } from '@env/environment';

declare const ga: any;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService implements OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private enabled: boolean;

  constructor(private router: Router) {
    this.enabled = false || environment.production;
  }

  trackPageViews() {
    if (this.enabled) {
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          takeUntil(this.unsubscribe$),
        )
        .subscribe((event: NavigationEnd) => {
          ga('send', { hitType: 'pageview', page: event.urlAfterRedirects });
        });
    }
  }

  trackEvent(eventName: string) {
    if (this.enabled) {
      ga('send', 'event', eventName);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
