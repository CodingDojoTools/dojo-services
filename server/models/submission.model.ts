import { model, Model, Schema, Document } from 'mongoose';
import { IExam } from './exam.model';
import { IBelt } from './belt.model';

const { ObjectId } = Schema.Types;

export const SubmissionSchema = new Schema(
  {
    belt: {
      ref: 'Belt',
      type: ObjectId,
    },
    stack: {
      type: ObjectId,
      ref: 'Stack',
      required: true,
    },
    exam: {
      type: ObjectId,
      ref: 'Exam',
      required: true,
    },
    files: [
      {
        type: ObjectId,
        ref: 'SubmissionFile',
      },
    ],
    student: {
      type: ObjectId,
      ref: 'Student',
    },
    instructor: {
      type: ObjectId,
      ref: 'User',
    },
    integrity: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
    },
    takenOn: {
      type: Date,
      required: true,
      default: Date.now,
    },
    source: {
      link: {
        type: String,
        required: true,
        trim: true,
        default: 'file',
      },
      path: {
        type: String,
        required: true,
        trim: true,
        default: '',
      },
      default: Object.create(null),
    },
  },
  {
    timestamps: true,
  }
);

export interface ISubmission {
  _id?: string;
  belt: string | IBelt;
  exam: string | IExam;
  files: string[];
  stack: string;
  student: string;
  instructor: string;
  integrity: boolean;
  takenOn: Date;
  source: {
    link: string;
    path: string;
  };
}

export interface SubmissionDocument extends Document, ISubmission {
  _id: any;
}
export interface SubmissionModel extends Model<SubmissionDocument> {}

export const Submission: SubmissionModel = model<SubmissionDocument>(
  'Submission',
  SubmissionSchema
);
