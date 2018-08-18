import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';
import { CRUD } from '../interfaces';

export abstract class BaseController implements CRUD {
  constructor(private model: Model<Document>) {}

  async index(_request: Request, response: Response) {
    response.json(await this.model.find({}).lean());
  }
  async show(request: Request, response: Response) {
    response.json(await this.model.findById(request.params[this.param]).lean());
  }
  async create(request: Request, response: Response) {
    response.json(await this.model.create(request.body));
  }
  async update(request: Request, response: Response) {
    response.json(
      await this.model
        .findByIdAndUpdate(request.params[this.param], request.body, {
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        })
        .lean()
    );
  }
  async destroy(request: Request, response: Response) {
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
