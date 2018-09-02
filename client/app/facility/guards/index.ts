import { StackVariantExistsGuard } from './stack-variant-exists.guard';
import { LocationExistsGuard } from './location-exists.guard';
import { StackVariantsGuard } from './stack-variants.guard';
import { StackExistsGuard } from './stack-exists.guard';
import { UserExistsGuard } from './user-exists.guard';
import { LocationsGuard } from './locations.guard';
import { StacksGuard } from './stacks.guard';
import { UsersGuard } from './users.guard';

export const guards: any[] = [
  StackVariantExistsGuard,
  LocationExistsGuard,
  StackVariantsGuard,
  StackExistsGuard,
  UserExistsGuard,
  LocationsGuard,
  StacksGuard,
  UsersGuard,
];

export * from './stack-variant-exists.guard';
export * from './location-exists.guard';
export * from './stack-variants.guard';
export * from './stack-exists.guard';
export * from './user-exists.guard';
export * from './locations.guard';
export * from './stacks.guard';
export * from './users.guard';
