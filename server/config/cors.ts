import { CorsOptions } from 'cors';

const exposeAllow = [
  'Content-Type',
  'Authorization',
  'DNT',
  'User-Agent',
  'Keep-Alive',
  'Content-Type',
  'accept',
  'origin',
  'X-Requested-With',
  'Content-Disposition',
];

export const corsOptions: CorsOptions = {
  allowedHeaders: exposeAllow,
  exposedHeaders: exposeAllow,
};
