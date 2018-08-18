import { StoreEntityExistsGuard } from './store-entity-exists.guard';
import { StoreEntitiesGuard } from './store-entities.guard';

export const guards: any[] = [StoreEntitiesGuard, StoreEntityExistsGuard];

export * from './store-entities.guard';
export * from './store-entity-exists.guard';
