import { model, Model, Document, Schema, Types } from 'mongoose';
import { SubmissionModel } from './submission.model';
import { StackModel } from './stack.model';
import { ExamModel } from './exam.model';
import { UserModel } from './user.model';

const { ObjectId } = Schema.Types;

export const SimilarityAssessmentSchema = new Schema(
  {
    source: {
      type: ObjectId,
      ref: 'Submission',
      required: true,
      index: true,
    },
    reference: {
      type: ObjectId,
      ref: 'Submission',
      required: true,
      index: true,
    },
    stack: {
      type: ObjectId,
      ref: 'Stack',
      required: true,
      index: true,
    },
    exam: {
      type: ObjectId,
      ref: 'Exam',
      required: true,
      index: true,
    },
    initiator: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },

    ratings: [
      {
        type: ObjectId,
        ref: 'Rating',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export interface ISimilarityAssessment {
  _id?: string;
  source: string | SubmissionModel;
  reference: string | SubmissionModel;
  stack: string | StackModel;
  exam: string | ExamModel;
  initiator: string | UserModel;
  rating: number;
  ratings: string[];
}

export interface SimilarityAssessmentDocument
  extends Document,
    ISimilarityAssessment {
  _id: any;
}
export interface SimilarityAssessmentModel
  extends Model<SimilarityAssessmentDocument> {}

export const SimilarityAssessment: SimilarityAssessmentModel = model<
  SimilarityAssessmentDocument
>('SimilarityAssessment', SimilarityAssessmentSchema);
