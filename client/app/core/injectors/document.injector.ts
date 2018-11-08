import { InjectionToken } from '@angular/core';

export const DJS_DOCUMENT = new InjectionToken<Document>('Document', {
  factory: () => document,
});
