import { Document, Model, Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;
const identitySchema = new Schema(
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

export interface IIdentity extends Document {
  provider: string;
  providerId: string;
  user: string;
}
export interface IdentityModel extends Model<IIdentity> {}

export const Identity: IdentityModel = model<IIdentity>(
  'Identity',
  identitySchema
);
