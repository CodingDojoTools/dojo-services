import { model, Model, Schema, Document } from 'mongoose';
import { SubmissionFileModel } from './submission-file.model';

const { ObjectId } = Schema.Types;

export const RatingSchema = new Schema({
  source: {
    type: ObjectId,
    ref: 'SubmissionFile',
    required: true,
  },
  filename: {
    type: String,
    required: true,
    trim: true,
  },
  bestMatch: {
    target: {
      type: String,
      required: true,
      trim: true,
    },
    reference: {
      type: ObjectId,
      ref: 'SubmissionFile',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  ratings: [
    {
      target: {
        type: String,
        required: true,
        trim: true,
      },
      reference: {
        type: ObjectId,
        ref: 'SubmissionFile',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
});

export interface IRating {
  _id?: string;
  filename: string;
  source: string | SubmissionFileModel;
  bestMatch: Target;
  ratings: Target[];
}

export interface RatingDocument extends Document, IRating {
  _id: any;
}
export interface RatingModel extends Model<RatingDocument> {}

interface Target {
  target: string;
  reference: string;
  rating: number;
}

export const Rating: RatingModel = model<RatingDocument>(
  'Rating',
  RatingSchema
);
