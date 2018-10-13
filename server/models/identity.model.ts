import { Document, Model, Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;
const IdentitySchema = new Schema(
  {
    provider: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface IIdentity {
  _id?: string;
  provider: string;
  providerId: string;
  user: string;
}

export interface IdentityDocument extends Document, IIdentity {
  _id: any;
}
export interface IdentityModel extends Model<IdentityDocument> {}

export const Identity: IdentityModel = model<IdentityDocument>(
  'Identity',
  IdentitySchema
);
