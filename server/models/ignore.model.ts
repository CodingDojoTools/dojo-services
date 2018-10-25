import { model, Document, Model, Schema, Aggregate } from 'mongoose';

const { ObjectId } = Schema.Types;

export const IgnoreSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Your ignoreable must have a name'],
    trim: true,
    unique: true,
  },
  caseSensitive: {
    type: Boolean,
    required: [true, 'Is your ignoreable case sensitive?'],
    default: false,
  },
  type: {
    type: String,
    enum: ['file', 'folder'],
    required: true,
    lowercase: true,
  },
  exclusions: [
    {
      type: ObjectId,
      ref: 'Stack',
    },
  ],
  note: {
    type: String,
    default: '',
  },
});

IgnoreSchema.static('ignoreables', function(
  stackID: string
): Promise<Ignoreables> {
  return new Promise((resolve, reject) => {
    (this as IgnoreModel).aggregate(
      [
        {
          $match: { exclusions: { $ne: stackID } },
        },
        {
          $group: {
            _id: null,
            files: {
              $push: {
                $cond: [{ $eq: ['$type', 'file'] }, '$name', null],
              },
            },
            directories: {
              $push: {
                $cond: [{ $eq: ['$type', 'folder'] }, '$name', null],
              },
            },
          },
        },
        {
          $project: {
            ignoreDirectories: {
              $filter: {
                input: '$directories',
                as: 'item',
                cond: { $ne: ['$$item', null] },
              },
            },
            ignoreFiles: {
              $filter: {
                input: '$files',
                as: 'item',
                cond: { $ne: ['$$item', null] },
              },
            },
          },
        },
      ],
      function(error: Error, ignoreable: Ignoreables[]) {
        if (error) {
          return reject(error);
        }
        resolve(ignoreable[0] || ({} as any));
      }
    );
  });
});

export interface Ignoreables {
  ignoreDirectories: string[];
  ignoreFiles: string[];
}

export type IgnoreTypes = 'file' | 'folder';

export interface IIgnore {
  _id?: string;
  name: string;
  caseSensitive: boolean;
  type: IgnoreTypes;
  exclusions: string[];
  note: string;
}

export interface IgnoreDocument extends Document, IIgnore {
  _id: any;
}
export interface IgnoreModel extends Model<IgnoreDocument> {
  ignoreables: (id: string) => Promise<Ignoreables>;
}

export const Ignore: IgnoreModel = model<IgnoreDocument, IgnoreModel>(
  'Ignore',
  IgnoreSchema
);
