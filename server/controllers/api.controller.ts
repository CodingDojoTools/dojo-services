import { BaseController } from './base.controller';
import { ApiKeyModel, ApiKey } from '@server/models';

class ApikeyController extends BaseController {
  constructor(model: ApiKeyModel) {
    super(model);
  }

  async create(request, response) {
    const { _id: user } = request.token;
    const apikey = await this.model.create({ user });
    await this.model.updateMany(
      { $and: [{ user }, { revoked: false }, { _id: { $ne: apikey._id } }] },
      { revoked: true, revokedAt: new Date() }
    );

    response.json(apikey);
  }

  async show(request, response) {
    const { _id: user } = request.token;
    const apikey = await this.model.findOne({ user });

    response.json(apikey);
  }
}

export const apiController = new ApikeyController(ApiKey);
