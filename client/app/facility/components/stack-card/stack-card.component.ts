import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stack-card',
  templateUrl: './stack-card.component.html',
  styleUrls: ['./stack-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StackCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
