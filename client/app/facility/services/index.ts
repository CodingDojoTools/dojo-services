import { StackVariantService } from './stack-variant.service';
import { LocationService } from './location.service';
import { StackService } from './stack.service';
import { UserService } from './user.service';

export const services: any[] = [
  StackVariantService,
  LocationService,
  StackService,
  UserService,
];

export * from './stack-variant.service';
export * from './location.service';
export * from './stack.service';
export * from './user.service';
