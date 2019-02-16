import { Router, NavigationStart } from '@angular/router';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { filter, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(event => event instanceof NavigationStart)
      )
      .subscribe(() => {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
          this.clear();
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  clear() {}
}
