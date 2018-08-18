import { model, Schema, Document, Model } from 'mongoose';

const { ObjectId } = Schema.Types;

const stackSchema = new Schema({
  name: {
    required: [true, 'Stack name is required information'],
    trim: true,
    type: String,
    index: true,
  },
  variant: {
    type: ObjectId,
    ref: 'StackVariant',
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export interface IStack extends Document {
  name: string;
  variant: string;
  active: boolean;
}

export interface StackModel extends Model<IStack> {}

export const Stack: StackModel = model<IStack>('Stack', stackSchema);
