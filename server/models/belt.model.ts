import { model, Schema, Model, Document } from 'mongoose';

export const BeltSchema = new Schema({
  color: {
    type: String,
    required: [true, 'Belt color is required'],
    trim: true,
    lowercase: true,
    unique: true,
  },
  requirements: {
    type: String,
    required: true,
    trim: true,
    default: '',
  },
});

export interface IBelt {
  _id?: string;
  color: string;
  requirements: string;
}

export interface BeltDocument extends Document, IBelt {
  _id: any;
}
export interface BeltModel extends Model<BeltDocument> {}

export const Belt = model<BeltDocument>('Belt', BeltSchema);
