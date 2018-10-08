import * as uniqueValidator from 'mongoose-unique-validator';
import * as mongoose from 'mongoose';
import { inspect } from 'util';

import { uri, options } from './dboptions';
import { PRODUCTION } from './production';
import { debug } from '@server/utils';

export const dbConnection = mongoose.connect(
  uri,
  options
);

mongoose.plugin(uniqueValidator, { message: '{PATH} must be unique' });

if (!PRODUCTION) {
  /*
  *  CONNECTION EVENTS
  *  When successfully connected
  */
  mongoose.connection.on('connected', () => {
    debug(`Mongoose default connection open to ${uri}`);
  });

  /*
  *  If the connection throws an error
  */
  mongoose.connection.on('error', err => {
    debug(`Mongoose default connection error: ${err}`);

    process.exit(0);
  });

  /*
  * print mongoose logs when debugging
  */
  if (process.env.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      debug(`${collectionName}.${method}`, inspect(query, false, 20), doc);
    });
  }

  /*
  *  When the connection is disconnected
  */
  mongoose.connection.on('disconnected', () => {
    debug('Mongoose default connection disconnected');
  });

  /*
  *  If the Node process ends, close the Mongoose connection
  */
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      debug(
        'Mongoose default connection disconnected through program termination'
      );
      process.exit(0);
    });
  });
}
