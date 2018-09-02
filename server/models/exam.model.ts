import { model, Schema, Document, Model } from 'mongoose';
import { ImageBuffer } from '../interfaces';

const { ObjectId } = Schema.Types;

const examSchema = new Schema({
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

examSchema.index({ stack: 1, option: 1, name: 1 }, { unique: true });

export interface IExam extends Document {
  active: boolean;
  name: string;
  option: string;
  stack: string;
  wireframe: ImageBuffer;
}

export interface ExamModel extends Model<IExam> {}

export const Exam: ExamModel = model<IExam>('Exam', examSchema);
