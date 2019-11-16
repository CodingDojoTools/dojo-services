import { Document, Model, Schema, model, Types } from 'mongoose';
import { tokenOptions } from '@server/config';
import { signToken } from '@server/utils';

const { ObjectId } = Schema.Types;

const AuthTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    revoked: {
      type: Boolean,
      required: true,
      default: false,
    },
    revokedAt: Date,
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

AuthTokenSchema.static('generate', async function(
  user: string,
  secret: string,
  roles: any[] = []
): Promise<AuthTokenDocument> {
  const _id = new Types.ObjectId();
  const payload = { _id: user, roles, token: _id };
  const token = await signToken(payload, secret, tokenOptions);
  return await AuthToken.create({ user, _id, token });
});

AuthTokenSchema.static('revoke', async function(
  id: string
): Promise<AuthTokenDocument> {
  return await AuthToken.findByIdAndUpdate(
    id,
    { $set: { revoked: true, revokedAt: Date.now() } },
    { new: true }
  );
});

export interface IAuthToken {
  _id?: string;
  token: string;
  revoked: boolean;
  revokedAt?: Date;
  user: string;
}

export interface AuthTokenDocument extends Document, IAuthToken {
  _id: any;
}

export interface AuthTokenModel extends Model<AuthTokenDocument> {
  generate(
    _id: string,
    secret: string,
    roles?: any[]
  ): Promise<AuthTokenDocument>;
  revoke(id: string): Promise<AuthTokenDocument>;
}

export const AuthToken: AuthTokenModel = model<
  AuthTokenDocument,
  AuthTokenModel
>('Token', AuthTokenSchema);
