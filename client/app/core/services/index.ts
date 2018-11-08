import { LocalStorageService } from './local-storage.service';
import { AnalyticsService } from './analytics.service';
import { AnimationService } from './animation.service';
import { TitleService } from './title.service';

export const services: any[] = [
  LocalStorageService,
  AnalyticsService,
  AnimationService,
  TitleService,
];

export * from './base.service';
export * from './title.service';
export * from './analytics.service';
export * from './animation.service';
export * from './local-storage.service';
