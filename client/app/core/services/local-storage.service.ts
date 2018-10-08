import { Injectable } from '@angular/core';

import { APP_PREFIX } from '@app/config/app-prefix.config';

@Injectable()
export class LocalStorageService {
  static loadInitialState(): any {
    return Object.keys(localStorage).reduce((state: any, storageKey) => {
      if (storageKey.startsWith(APP_PREFIX)) {
        state = state || {};
        const stateKey = this.splitKey(storageKey);
        let currentStateRef = state;
        stateKey.forEach((key, index) => {
          if (index === stateKey.length - 1) {
            currentStateRef[key] = JSON.parse(localStorage.getItem(storageKey));
            return;
          }
          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });
      }
      return state;
    }, undefined);
  }

  private static splitKey(key: string): string[] {
    return key
      .replace(APP_PREFIX, '')
      .toLowerCase()
      .split('.');
  }
  static getItem(key: string): any {
    return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
  }

  getItem(key: string): any {
    return LocalStorageService.getItem(key);
  }

  removeItem(key: string): void {
    return localStorage.removeItem(`${APP_PREFIX}${key}`);
  }
}
