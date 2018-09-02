import { Directive, HostBinding, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneNumberFormatter]',
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
