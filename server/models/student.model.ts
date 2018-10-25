import { model, Schema, Document, Model } from 'mongoose';
import { isEmail } from 'validator';

const { ObjectId } = Schema.Types;

export const StudentSchema = new Schema(
  {
    location: {
      ref: 'Location',
      type: ObjectId,
      required: [true, 'Please provide the students Dojo Location'],
    },
    firstName: {
      type: String,
      index: true,
      required: [true, 'A student needs a first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'A student needs a last name'],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      trim: true,
      unique: true,
      validate: [
        isEmail,
        '{VALUE} does not appear to be a valid email address',
      ],
    },
  },
  {
    timestamps: true,
  }
);

export interface IStudent {
  _id?: string;
  location: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface StudentDocument extends Document, IStudent {
  _id: any;
}
export interface StudentModel extends Model<StudentDocument> {}

export const Student: StudentModel = model<StudentDocument>(
  'Student',
  StudentSchema
);
