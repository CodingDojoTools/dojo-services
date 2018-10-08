import { ENV } from '@server/config';
import * as debuggable from 'debug';

const capped = ENV.charAt(0).toUpperCase() + ENV.substr(1);

export const debug = debuggable(`DojoServices${capped}`);
