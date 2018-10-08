import { Directive, HostBinding, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[phoneNumberFormatter]',
})
export class PhoneNumberFormatterDirective {
  @HostBinding()
  @Input()
  value: string;

  constructor() {}

  @HostListener('onchange')
  onchange() {
    console.log('value', this.value);
  }
}
