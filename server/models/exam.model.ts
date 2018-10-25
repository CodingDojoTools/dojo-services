import { model, Schema, Document, Model } from 'mongoose';
import { ImageBuffer } from '@server/interfaces';
import { StackModel } from './stack.model';

const { ObjectId } = Schema.Types;

export const ExamSchema = new Schema({
  active: {
    default: true,
    index: true,
    required: true,
    type: Boolean,
  },
  name: {
    required: [true, 'Exam name is required'],
    index: true,
    trim: true,
    type: String,
  },
  option: {
    required: [true, 'Which exam option is this?'],
    uppercase: true,
    trim: true,
    type: String,
  },
  stack: {
    ref: 'Stack',
    required: [true, 'To which stack does this exam belong?'],
    type: ObjectId,
    index: true,
  },
  wireframe: {
    data: Buffer,
    contentType: {
      type: String,
      trim: true,
    },
  },
});

ExamSchema.index({ stack: 1, option: 1, name: 1 }, { unique: true });

export interface IExam {
  _id?: string;
  active: boolean;
  name: string;
  option: string;
  stack: string | StackModel;
  wireframe: ImageBuffer;
}

export interface ExamDocument extends Document, IExam {
  _id: any;
}
export interface ExamModel extends Model<ExamDocument> {}

export const Exam: ExamModel = model<ExamDocument>('Exam', ExamSchema);
