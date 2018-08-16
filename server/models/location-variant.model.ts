import { model, Schema, Document, Model } from 'mongoose';

const locationVariantSchema = new Schema({
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

export interface ILocationVariant extends Document {
  type: string;
  active: boolean;
}

export interface LocationVariantModel extends Model<ILocationVariant> {}

export const LocationVariant: LocationVariantModel = model<ILocationVariant>(
  'LocationVariant',
  locationVariantSchema
);
