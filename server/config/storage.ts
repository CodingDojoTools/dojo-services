import { PRODUCTION } from './production';
import { resolve } from 'path';

export const STORAGE = PRODUCTION ? '/tmp' : resolve('upload');
