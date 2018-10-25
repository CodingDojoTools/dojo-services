import { CRUD, Request, Response } from '@server/interfaces';
import { Document, Model } from 'mongoose';

export abstract class BaseController implements CRUD {
  constructor(protected model: Model<Document>) {
    if (new.target === BaseController) {
      throw new Error(
        'BaseController is an abstract class and may not be instantiated directly'
      );
    }
  }

  async index(request: Request, response: Response): Promise<any> {
    response.json(await this.model.find(request.query).lean());
  }
  async show(request: Request, response: Response): Promise<any> {
    response.json(await this.model.findById(request.params[this.param]).lean());
  }
  async create(request: Request, response: Response): Promise<any> {
    response.json(await this.model.create(request.body));
  }
  async update(request: Request, response: Response): Promise<any> {
    response.json(
      await this.model
        .findByIdAndUpdate(
          request.params[this.param],
          { $set: request.body },
          {
            new: true,
          }
        )
        .lean()
    );
  }
  async destroy(request: Request, response: Response): Promise<any> {
    response.json(
      await this.model.findByIdAndRemove(request.params[this.param]).lean()
    );
  }

  get param() {
    return (
      this.constructor.name
        .replace(/Controller$/, '')
        .replace(/(?<=.)([A-Z])/g, char => `_${char}`)
        .toLowerCase() + '_id'
    );
  }
}
