import { model, Schema, Model, Document } from 'mongoose';
import { not } from '@server/utils';
import * as uuid from 'uuid';

const { ObjectId } = Schema.Types;

export const ApiKeySchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      default: () => uuid(),
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    revoked: {
      type: Boolean,
      required: true,
      default: false,
    },
    revokedAt: Date,
  },
  {
    timestamps: true,
  }
);

ApiKeySchema.pre<ApiKeyDocument>('save', function() {
  if (this.isModified('revoked') && this.revoked && not(this.revokedAt)) {
    this.revokedAt = new Date();
  }
});

export interface IApiKey {
  _id?: string;
  key: string;
  user: string;
  revoked: boolean;
  revokedAt: Date;
}

export interface ApiKeyDocument extends Document, IApiKey {
  _id: any;
}
export interface ApiKeyModel extends Model<ApiKeyDocument> {}

export const ApiKey = model<ApiKeyDocument>('ApiKey', ApiKeySchema);
