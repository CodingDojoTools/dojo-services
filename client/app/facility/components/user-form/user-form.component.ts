import {
  Component,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  NgForm,
  Validators,
} from '@angular/forms';

import { Location } from '@facility/models';
import { User } from '@auth/models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnChanges {
  @Input()
  user: User;

  @Input()
  locations: Location[] = [];

  @Output()
  update = new EventEmitter<User>();

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required]],
    location: ['', [Validators.required]],
    photoUrl: [''],
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges(_changes: SimpleChanges) {
    if (this.user) {
      this.form.patchValue(this.user);
    }
  }

  onSubmit(form: NgForm) {
    const { value, valid }: { value: User; valid: boolean } = form;

    if (valid) {
      this.update.emit({ ...this.user, ...value });
    }
  }
}
