import { environment } from '@env/environment';

function noop(...rest: any[]) {}

export const debug = environment.production ? noop : console.log;
