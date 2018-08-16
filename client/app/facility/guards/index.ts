import { UserExistsGuard } from './user-exists.guard';
import { UsersGuard } from './users.guard';

export const guards: any[] = [UsersGuard, UserExistsGuard];

export * from './users.guard';
export * from './user-exists.guard';
