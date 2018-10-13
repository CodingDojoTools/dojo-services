import { model, Schema, Document, Model } from 'mongoose';

export const StackVariantSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Variant type is required information'],
    trim: true,
    unique: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export interface IStackVariant {
  _id?: string;
  type: string;
  active: boolean;
}

export interface StackVariantDocument extends Document, IStackVariant {
  _id: any;
}
export interface StackVariantModel extends Model<StackVariantDocument> {}

export const StackVariant: StackVariantModel = model<StackVariantDocument>(
  'StackVariant',
  StackVariantSchema
);
