import { createClient, RedisClient, ClientOpts } from 'redis';

import { configuration } from './configuration';

import * as redisStore from 'connect-redis';
import * as expressSession from 'express-session';

const client: RedisClient = createClient(configuration.sessionStore);
const RedisStore = redisStore(expressSession);
const config = configuration.session;

/**
 * @todo temporary
 */
config.store = new RedisStore(<any>{
  client,
});

export const session = expressSession(config);
