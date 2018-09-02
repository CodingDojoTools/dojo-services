import { PhoneNumberFormatterDirective } from './phone-number-formatter.directive';
import { BinaryToImageDirective } from './binary-to-image.directive';
import { TextOnHoverDirective } from './text-on-hover.directive';

export const directives: any[] = [
  TextOnHoverDirective,
  BinaryToImageDirective,
  PhoneNumberFormatterDirective,
];

export * from './phone-number-formatter.directive';
export * from './binary-to-image.directive';
export * from './text-on-hover.directive';
