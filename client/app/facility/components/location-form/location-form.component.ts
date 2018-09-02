import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { PHONE_REGEXP } from '@app/utils';

import { User } from '@auth/models';
import { Location } from '@facility/models';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFormComponent implements OnChanges {
  @Input()
  location: Location;

  @Input()
  employees: User[];

  @Input()
  users: User[];

  match = PHONE_REGEXP;

  form = this.fb.group({
    city: ['', [Validators.required]],
    address: [''],
    alias: [''],
    phone: [''],
    stacks: [[]],
    employees: [[]],
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges(_changes: SimpleChanges) {
    if (this.location) {
      this.form.patchValue(this.location);
    }
  }
}
