import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Location } from '@facility/models';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationCardComponent {
  @Input()
  location: Location;
}
