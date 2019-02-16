import { Document, Model, Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

export const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'Please provide a first name'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Please provide a last name'],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    lastSignIn: Date,
    lastIpAddress: String,
    photoUrl: String,
    location: {
      type: ObjectId,
      ref: 'Location',
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;

  lastSignIn: Date;
  lastIpAddress: string;

  active: boolean;
  photoUrl: string;
  location: string;
}

UserSchema.pre<UserDocument>('save', function(next) {
  if (this.isNew) {
    this.lastSignIn = new Date();
  }
  next();
});

export interface UserDocument extends Document, IUser {
  _id: any;
}
export interface UserModel extends Model<UserDocument> {}

export const User: UserModel = model<UserDocument>('User', UserSchema);
