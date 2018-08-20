import { Request } from 'express';

export function getIP(request: Request): string {
  const ip =
    request.ip ||
    request.headers['x-forwarded-for'] ||
    request.connection.remoteAddress;

  return Array.isArray(ip) ? ip[0] : ip;
}
