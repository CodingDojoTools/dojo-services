import { Document, Model, Schema, model } from 'mongoose';

const BlockCertSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    default: '',
  },
  blockId: {
    type: String,
    required: true,
  },
  cert: {
    type: String,
    required: true,
  },
  stacks: [
    {
      stack: {
        type: String,
        required: true,
        trim: true,
      },
      belt: {
        type: String,
        required: true,
        trim: true,
        enum: ['ORANGE', 'YELLOW', 'RED', 'BLACK', 'BLUE'],
        uppercase: true,
      },
    },
  ],
  publicKey: {
    type: String,
    trim: true,
    required: true,
  },
  issuedOn: {
    type: Date,
    required: true,
  },
});

export interface IBlockCert {
  _id?: string;
  name: string;
  email: string;
  blockId: string;
  cert: string;
  stacks: BlockStack[];
  publicKey: string;
  issuedOn: string | Date;
}

export interface BlockStack {
  stack: string;
  belt: Belt;
}

export type Belt = 'ORANGE' | 'YELLOW' | 'RED' | 'BLACK' | 'BLUE';

export interface BlockCertDocument extends Document, IBlockCert {
  _id: any;
}

export interface BlockCertModel extends Model<BlockCertDocument> {}

export const BlockCert = model<BlockCertDocument, BlockCertModel>(
  'BlockCert',
  BlockCertSchema,
);
