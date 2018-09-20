import { model, Schema, Document, Model } from 'mongoose';
import { PHONE_REGEXP } from '@server/utils';
import { ImageBuffer } from '@server/interfaces';

const { ObjectId } = Schema.Types;

const locationSchema = new Schema({
  city: {
    required: [true, 'In which city is this Dojo location?'],
    trim: true,
    type: String,
    unique: true,
  },
  alias: {
    type: String,
    trim: true,
    default: '',
  },
  address: {
    type: String,
    trim: true,
    default: '',
  },
  phone: {
    type: String,
    trim: true,
    match: PHONE_REGEXP,
    default: '',
  },
  image: {
    data: Buffer,
    contentType: {
      type: String,
      trim: true,
    },
  },
  stacks: [
    {
      ref: 'Stack',
      type: ObjectId,
    },
  ],
  employees: [
    {
      ref: 'User',
      type: ObjectId,
    },
  ],
});

export interface ILocation extends Document {
  alias: string;
  city: string;
  address: string;
  image?: ImageBuffer;
  phone: string;
  stacks: string[];
  employees: string[];
}

export interface LocationModel extends Model<ILocation> {}

export const Location: LocationModel = model<ILocation>(
  'Location',
  locationSchema
);
