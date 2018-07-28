import { json, urlencoded } from 'body-parser';
import { resolve } from 'path';

import { normalizePort, debug } from './utils';
import { PRODUCTION, session } from './config';
import { routes } from './routes';

import * as compress from 'compression';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as https from 'https';
import * as http from 'http';

const port = normalizePort(process.env.PORT || 8000);
const app = express();

/**
 * @todo
 * configure csurf
 * use https in production
 */

app
  .enable('trust proxy')
  .set('production', PRODUCTION)
  .set('port', port)
  .use(helmet())
  .use(compress())
  .use(logger('dev'))
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(session)
  .use(express.static(resolve('dist/public')))
  .use(routes)

  //
  .listen(port, () => debug(`Express server listening on port ${port}`));
