import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-stacks',
  templateUrl: './stacks.component.html',
  styleUrls: ['./stacks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StacksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
