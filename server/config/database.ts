import * as uniqueValidator from 'mongoose-unique-validator';
import { configuration, DbConfig } from './configuration';
import { PRODUCTION } from './production';
import * as mongoose from 'mongoose';
import * as models from '../models';
import { debug } from '../utils';
import { inspect } from 'util';
import { ENV } from './env';

const config: DbConfig = Object.assign(
  Object.create(null),
  configuration.database[ENV],
  configuration.database.default
);
export const uri = `${config.adapter}://${config.host}:${config.port}/${
  config.database
}`;

mongoose.connect(
  uri,
  config.options
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
