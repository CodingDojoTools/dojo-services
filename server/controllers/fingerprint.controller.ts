import { BaseController } from './base.controller';
import { FingerprintModel, Fingerprint } from '@server/models';

class FingerprintController extends BaseController {
  constructor(model: FingerprintModel) {
    super(model);
  }
}

export const fingerprintController = new FingerprintController(Fingerprint);
