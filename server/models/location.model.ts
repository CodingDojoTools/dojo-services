import { model, Schema, Document, Model } from 'mongoose';

const { ObjectId } = Schema.Types;

const locationSchema = new Schema({
  city: {
    required: [true, 'In which city is this Dojo location?'],
    trim: true,
    type: String,
    unique: true,
  },
  address: {
    type: String,
    trim: true,
    default: '',
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
  city: string;
  address: string;
  stacks: string[];
  employees: string[];
}

export interface LocationModel extends Model<ILocation> {}

export const Location: LocationModel = model<ILocation>(
  'Location',
  locationSchema
);
