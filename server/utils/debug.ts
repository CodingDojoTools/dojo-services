import * as debuggable from 'debug';
import { ENV, PRODUCTION } from '../config';

export const debug = PRODUCTION
  ? (..._rest: any[]) => {}
  : debuggable(`dojo_services_${ENV}`);
