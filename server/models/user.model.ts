import { Document, Model, Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;
const userSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;

  lastSignIn: Date;
  lastIpAddress: string;
}
export interface UserModel extends Model<IUser> {}

export const User: UserModel = model<IUser>('User', userSchema);
