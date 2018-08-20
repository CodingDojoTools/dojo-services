import { environment } from '@env/environment';

function noop(..._rest: any[]) {}

export const debug = environment.production ? noop : console.log;
