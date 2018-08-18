import { configuration, DbConfig } from './configuration';
import { ENV } from './env';

export const config: DbConfig = Object.assign(
  Object.create(null),
  configuration.database[ENV],
  configuration.database.default
);
export const uri = `${config.adapter}://${config.host}:${config.port}/${
  config.database
}`;

export const options = config.options;
