import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @Input() pending: boolean;

  @Input() errorMessage: string | null;

  faSignIn = faSignInAlt;

  @Output() login = new EventEmitter<never>();

  onClick() {
    this.login.emit();
  }
}
