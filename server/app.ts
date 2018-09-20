import { json, urlencoded } from 'body-parser';
import { resolve } from 'path';

import { PRODUCTION, session, TOKEN_SECRET, corsOptions } from './config';
import { normalizePort, debug, createServer } from './utils';
import { routes } from './routes';

import * as compress from 'compression';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';

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
  .set('token_secret', TOKEN_SECRET)
  .use(helmet())
  .use(compress())
  .use(logger('dev'))
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(session)
  .use(express.static(resolve('dist/public')))
  .use(cors(corsOptions))
  .use(routes);

const server = createServer(app);

server.listen(port, () => debug(`Express server listening on port ${port}`));
