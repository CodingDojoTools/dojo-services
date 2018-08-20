import { model, Schema, Document, Model } from 'mongoose';

const stackVariantSchema = new Schema({
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

export interface IStackVariant extends Document {
  type: string;
  active: boolean;
}

export interface StackVariantModel extends Model<IStackVariant> {}

export const StackVariant: StackVariantModel = model<IStackVariant>(
  'StackVariant',
  stackVariantSchema
);
