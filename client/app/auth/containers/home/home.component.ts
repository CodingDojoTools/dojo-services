import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromStore from '@auth/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  pending$ = this.store.pipe(select(fromStore.getLoginPagePending));
  error$ = this.store.pipe(select(fromStore.getLoginPageError));

  constructor(private readonly store: Store<fromStore.State>) {}

  onGoogleLogin() {
    this.store.dispatch(new fromStore.GoogleLogin());
  }
}
