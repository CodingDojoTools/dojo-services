import { SessionOptions } from 'express-session';
import { Envirator } from '@status/envirator';
import { ConnectionOptions } from 'mongoose';
import { ClientOpts } from 'redis';

import { PRODUCTION } from './production';

import * as Promise from 'bluebird';

global.Promise = Promise;

const envirator = new Envirator();

const SESSION_SECRET = envirator.provide('SESSION_SECRET', {
  defaultValue: 'dev-session',
});
const REDIS_PORT = envirator.provide<number>('REDIS_PORT', {
  defaultValue: 6379,
  mutators: parseInt,
});
const REDIS_HOST = envirator.provide('REDIS_HOST', {
  defaultValue: '127.0.0.1',
});
const SESSION_AGE = envirator.provide<number>('SESSION_AGE', {
  defaultValue: 43200 * 1000,
});
const MONGO_PORT = envirator.provide<number>('MONGO_PORT', {
  defaultValue: 27017,
  mutators: parseInt,
});
const MONGO_HOST = envirator.provide('MONGO_HOST', {
  defaultValue: 'localhost',
});
const MONGO_POOL = envirator.provide<number>('MONGO_POOL', {
  defaultValue: 15,
  mutators: parseInt,
  productionDefaults: true,
});
const DB_USER = envirator.provide('DB_USER', { warnOnly: true });
const DB_PASSWORD = envirator.provide('DB_PASSWORD', { warnOnly: true });

export const configuration: Configuration = {
  database: {
    default: {
      adapter: 'mongodb',
      host: MONGO_HOST,
      port: MONGO_PORT,
      options: {
        poolSize: MONGO_POOL,
        useNewUrlParser: true,
        useCreateIndex: true,
      },
    },
    development: {
      database: 'dojo_services_development',
    },
    test: {
      database: 'dojo_services_test',
    },
    production: {
      database: 'dojo_services_production',
      options: {
        user: DB_USER,
        pass: DB_PASSWORD,
        ssl: true,
      },
    },
  },
  session: {
    saveUninitialized: false,
    secret: SESSION_SECRET,
    name: 'session',
    resave: false,
    rolling: true,
    cookie: {
      secure: PRODUCTION,
      httpOnly: true,
      maxAge: SESSION_AGE,
    },
  },
  sessionStore: {
    port: REDIS_PORT,
    host: REDIS_HOST,
    db: 0,
  },
};

export interface DbConfig {
  adapter?: string;
  database?: string;
  host?: string;
  port?: number;
  options?: ConnectionOptions;
}

interface Configuration {
  database: {
    [key: string]: DbConfig;
  };
  session: SessionOptions;
  sessionStore: ClientOpts;
}
