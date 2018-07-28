import { SessionOptions } from 'express-session';
import { ConnectionOptions } from 'mongoose';
import { ClientOpts } from 'redis';

import { PRODUCTION } from './production';

import * as Promise from 'bluebird';

global.Promise = Promise;

const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-session';
const REDIS_PORT = parseInt(process.env.REDIS_PORT, 10) || 6379;
const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const SESSION_AGE = 43200 * 1000;

export const configuration: Configuration = {
  database: {
    default: {
      adapter: 'mongodb',
      host: 'localhost',
      port: 27017,
      options: {
        promiseLibrary: Promise,
        poolSize: 15,
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
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
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
