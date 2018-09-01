import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  OnChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  form = this.fb.group({
    city: ['', [Validators.required]],
    address: [''],
    stacks: [[]],
    employees: [[]],
  });

  constructor(private readonly fb: FormBuilder) {}

  ngOnChanges() {
    if (this.location) {
      this.form.patchValue(this.location);
    }
  }
}
