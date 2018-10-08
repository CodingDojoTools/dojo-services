import { JwtModuleOptions } from '@auth0/angular-jwt';

import { LocalStorageService } from '@app/core/services';
import { environment } from '@env/environment';
import { API } from '@shared/config';

export function tokenGetter() {
  return LocalStorageService.getItem('access_token');
}

const whitelistedDomains: string[] = environment.production
  ? []
  : ['localhost:4200'];
const blacklistedRoutes: string[] = environment.production
  ? []
  : [`localhost:4200/${API}/auth`];

export const jwtOptions: JwtModuleOptions = {
  config: {
    tokenGetter,
    whitelistedDomains,
    blacklistedRoutes,
    skipWhenExpired: true,
  },
};
