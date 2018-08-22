import { Request, Response, NextFunction } from 'express';
import { PRODUCTION } from '../../config';
import { isObject } from '../../utils';
import chalk from 'chalk';

export function routeLogger(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  if (!PRODUCTION) {
    const keys = [
      'method',
      'hostname',
      'ip',
      'body',
      'cookies',
      'params',
      'path',
      'protocol',
      'route',
    ];

    keys.forEach(key => {
      const data: string | object = request[key];

      if (data) {
        if (isObject(data)) {
          if (Object.keys(data).length) {
            console.log(
              chalk.red(`The request ${key} object has these properties: `)
            );

            for (const [k, v] of Object.entries(data)) {
              console.log(chalk.blue(`\t${k} => ${v}`));
            }
          }
        } else {
          console.log(chalk.gray(`The request ${key} is ${data}`));
        }
      }
    });
  }

  next();
}
