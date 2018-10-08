import { StackVariantEffects } from './stack-variant.effects';
import { LocationEffects } from './location.effects';
import { StackEffects } from './stack.effects';
import { UserEffects } from './user.effects';

export const effects: any[] = [
  StackVariantEffects,
  LocationEffects,
  StackEffects,
  UserEffects,
];

export * from './stack-variant.effects';
export * from './location.effects';
export * from './stack.effects';
export * from './user.effects';
