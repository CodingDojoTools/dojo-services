import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTextComponent {
  @Input()
  parent: FormGroup;

  @Input()
  controlName: string;

  @Input()
  placeholder = '';

  @Input()
  readonly = false;

  get control(): FormControl {
    return this.parent.get(this.controlName) as FormControl;
  }

  get valid(): boolean {
    return this.control.valid;
  }

  get touched(): boolean {
    return this.control.touched;
  }

  get required(): boolean {
    return this.touchedWithError('required');
  }

  get minLength(): boolean {
    return this.touchedWithError('minlength');
  }

  get length() {
    return this.control.getError('minlength');
  }

  hasError(error: string): boolean {
    return this.control.hasError(error);
  }

  touchedWithError(error: string): boolean {
    return this.touched && this.hasError(error);
  }

  format(): string {
    const content = this.placeholder || this.formatControl();

    return content.toLowerCase();
  }

  private formatControl(): string {
    return this.controlName
      .replace(/_-/g, ' ')
      .replace(/[A-Z]/g, char => ` ${char}`)
      .trim();
  }
}
