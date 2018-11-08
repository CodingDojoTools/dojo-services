import { ActivatedRouteSnapshot, Router, ActivationEnd } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class TitleService implements OnDestroy {
  unsubscribe$ = new Subject<void>();

  constructor(private readonly title: Title, private readonly router: Router) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  trackTitle() {
    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((event: ActivationEnd) => {
        this.setTitle(event.snapshot);
      });
  }

  private setTitle(snapshot: ActivatedRouteSnapshot) {
    while (snapshot.children.length) {
      snapshot = snapshot.children[0];
    }
    const { title } = snapshot.data;
    if (title) {
      this.title.setTitle(`${title} - ${env.appName}`);
    } else {
      this.title.setTitle(env.appName);
    }
  }
}
