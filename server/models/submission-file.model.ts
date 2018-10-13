import { model, Schema, Document, Model } from 'mongoose';
import { ISubmission } from './submission.model';

const { ObjectId } = Schema.Types;

export const SubmissionFileSchema = new Schema(
  {
    extension: {
      type: String,
      trim: true,
      index: true,
      default: '',
    },
    filename: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    contents: {
      type: String,
      required: true,
      default: '',
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    submission: {
      type: ObjectId,
      ref: 'Submission',
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export interface ISubmissionFile {
  _id?: string;
  extension: string;
  contents: string;
  filename: string;
  path: string;
  submission: string | ISubmission;
  size: number;
}

export interface SubmissionFileDocument extends Document, ISubmissionFile {
  _id: any;
}
export interface SubmissionFileModel extends Model<SubmissionFileDocument> {}

export const SubmissionFile: SubmissionFileModel = model<
  SubmissionFileDocument
>('SubmissionFile', SubmissionFileSchema);
