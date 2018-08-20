import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Location } from '@facility/models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-location-select',
  templateUrl: './location-select.component.html',
  styleUrls: ['./location-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationSelectComponent {
  @Input()
  parent: FormGroup;

  @Input()
  locations: Location[];
}
