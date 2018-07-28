import { createClient } from 'redis';

import { configuration } from './configuration';

import * as redisStore from 'connect-redis';
import * as expressSession from 'express-session';

const client = createClient(configuration.sessionStore);
const RedisStore = redisStore(expressSession);
const config = configuration.session;

config.store = new RedisStore({
  client,
});

export const session = expressSession(config);
