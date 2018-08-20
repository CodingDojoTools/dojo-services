import { LocationExistsGuard } from './location-exists.guard';
import { UserExistsGuard } from './user-exists.guard';
import { LocationsGuard } from './locations.guard';
import { UsersGuard } from './users.guard';

export const guards: any[] = [
  LocationExistsGuard,
  LocationsGuard,
  UsersGuard,
  UserExistsGuard,
];

export * from './location-exists.guard';
export * from './user-exists.guard';
export * from './locations.guard';
export * from './users.guard';
