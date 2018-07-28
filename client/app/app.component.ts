import { Component } from '@angular/core';

import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { AuthenticationService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  faSignIn = faSignInAlt;

  constructor(private readonly auth: AuthenticationService) {}

  onClick() {
    this.auth.googleSignIn().subscribe(user => {
      console.log(user);
    });
  }
}
