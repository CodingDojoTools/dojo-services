import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
