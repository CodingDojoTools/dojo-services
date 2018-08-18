import * as uniqueValidator from 'mongoose-unique-validator';
import { uri, options } from './dboptions';
import { PRODUCTION } from './production';
import * as mongoose from 'mongoose';
import { debug } from '../utils';
import { inspect } from 'util';

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
    console.log(`Mongoose default connection open to ${uri}`);
  });

  /*
  *  If the connection throws an error
  */
  mongoose.connection.on('error', err => {
    console.error(`Mongoose default connection error: ${err}`);

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
    console.log('Mongoose default connection disconnected');
  });

  /*
  *  If the Node process ends, close the Mongoose connection
  */
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose default connection disconnected through program termination'
      );
      process.exit(0);
    });
  });
}
