import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '@app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly auth: AuthenticationService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  onLogout() {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/'));
  }
}
