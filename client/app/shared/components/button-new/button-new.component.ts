import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-button-new',
  templateUrl: './button-new.component.html',
  styleUrls: ['./button-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonNewComponent {
  @Input()
  text = 'New Resource';
}
