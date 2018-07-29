import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(
    private readonly auth: AuthenticationService,
    private readonly router: Router
  ) {}

  onLogin() {
    this.auth.googleSignIn().subscribe(user => {
      console.log('loggedin user', user);

      localStorage.setItem('user', JSON.stringify(user));

      this.router.navigateByUrl('dashboard');
    });
  }
}
