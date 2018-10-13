import { model, Model, Schema, Document } from 'mongoose';
import { SubmissionModel } from './submission.model';
import { SubmissionFileModel } from './submission-file.model';

const { ObjectId } = Schema.Types;

const FingerprintSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    file: {
      type: ObjectId,
      ref: 'SubmissionFile',
      required: true,
    },
    method: {
      type: String,
      required: true,
      index: true,
    },
    contents: {
      type: String,
      required: true,
    },
    submission: {
      type: ObjectId,
      ref: 'Submission',
    },
  },
  {
    timestamps: true,
  }
);

export interface IFingerprint {
  _id?: string;
  submission: string | SubmissionModel;
  file: string | SubmissionFileModel;
  filename: string;
  method: string;
  contents: string;
}

export interface FingerprintDocument extends Document, IFingerprint {
  _id: any;
}
export interface FingerprintModel extends Model<FingerprintDocument> {}

export const Fingerprint: FingerprintModel = model<FingerprintDocument>(
  'Fingerprint',
  FingerprintSchema
);
