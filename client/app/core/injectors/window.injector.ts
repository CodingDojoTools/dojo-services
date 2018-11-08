import { InjectionToken } from '@angular/core';

export const DJS_WINDOW = new InjectionToken<Window>('Window', {
  factory: () => window,
});
