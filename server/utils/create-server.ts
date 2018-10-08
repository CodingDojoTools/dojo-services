import { PRODUCTION } from '@server/config';
import { not } from '@server/utils';
import { Express } from 'express';

import * as https from 'https';
import * as http from 'http';

/**
 * @todo proper key and cert
 */
const credentials: https.ServerOptions = {
  key: '',
  cert: '',
};

export function createServer(app: Express): Server {
  if (not(PRODUCTION)) {
    return http.createServer(app);
  }

  return https.createServer(credentials, app);
}

type Server = http.Server | https.Server;
