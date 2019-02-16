import { Action } from '@ngrx/store';

export enum NotificationActionTypes {
  Close = '[Notification] Close',
  Warn = '[Notification] Warn',
  Success = '[Notification] Success',
  Error = '[Notification] Error',
  Info = '[Notification] Info',
}

export class NotificationClose implements Action {
  readonly type = NotificationActionTypes.Close;

  constructor(public payload?: string) {}
}

export class NotificationWarn implements Action {
  readonly type = NotificationActionTypes.Warn;

  constructor(public payload: string) {}
}
