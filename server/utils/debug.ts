import * as debuggable from 'debug';
import { ENV } from '../config';

const capped = ENV.charAt(0).toUpperCase() + ENV.substr(1);

export const debug = debuggable(`DojoServices${capped}`);
