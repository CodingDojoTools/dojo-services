import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Output()
  logout = new EventEmitter<never>();
  @Input()
  loggedIn: boolean;

  onClick() {
    this.logout.emit();
  }
}
