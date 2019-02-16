import { Request, Response, NextFunction } from '@server/interfaces';
import { UnAuthorizedError } from '@server/utils';
import { ApiKey } from '@server/models';
import { not } from '@server/utils';

export async function apikey(
  request: Request,
  _response: Response,
  next: NextFunction
) {
  const { apikey: key }: { apikey: string } = request.query;
  const apiKey = await ApiKey.findOne({ key, revoked: false });

  if (not(apiKey)) {
    return next(new UnAuthorizedError('Invalid or revoked API key'));
  }

  next();
}
