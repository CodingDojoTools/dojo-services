import { Request } from 'express';

export function getIP(request: Request): string {
  const ip =
    request.ip ||
    request.headers['x-forwarded-for'] ||
    request.connection.remoteAddress;

  if (Array.isArray(ip)) {
    return ip[0];
  }

  return ip;
}
