import { model, Schema, Document, Model } from 'mongoose';

import { ImageBuffer } from '@server/interfaces';

const { ObjectId } = Schema.Types;

export const StackSchema = new Schema({
  name: {
    required: [true, 'Stack name is required information'],
    trim: true,
    type: String,
    index: true,
  },
  image: {
    data: Buffer,
    contentType: {
      type: String,
      trim: true,
    },
  },
  variant: {
    type: ObjectId,
    ref: 'StackVariant',
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export interface IStack {
  _id?: string;
  name: string;
  image: ImageBuffer;
  variant: string;
  active: boolean;
}

export interface StackDocument extends Document, IStack {
  _id: any;
}
export interface StackModel extends Model<StackDocument> {}

export const Stack: StackModel = model<StackDocument>('Stack', StackSchema);
