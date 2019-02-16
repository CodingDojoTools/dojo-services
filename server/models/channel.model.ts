import * as beautifyUnique from 'mongoose-beautiful-unique-validation';
import { model, Schema, Document, Model } from 'mongoose';
import { isEmpty, titleize } from '@server/utils';

const ChannelSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A channel name must be provided'],
    },
    slug: {
      type: String,
      required: [true, 'Channel slug is required (i.e url name)'],
      trim: true,
      unique: 'Channel slug is not unique: {VALUE}',
    },
    mattermostID: {
      type: String,
      required: [true, 'Channel Mattermost ID is required'],
      trim: true,
      unique: 'Mattermost ID is not unique: {VALUE}',
      minlength: 20,
      match: [
        /^[a-z0-9]+$/,
        'Supplied Mattermost ID is invalid. Likely your requested channel was not found',
      ],
    },
  },
  {
    timestamps: true,
  }
);

ChannelSchema.pre<ChannelDocument>('validate', function() {
  if (isEmpty(this.name) && this.slug) {
    this.name = titleize(this.slug.replace(/-/g, ' ').replace('.', ''));
  }
});

ChannelSchema.plugin(beautifyUnique);

export interface IChannel {
  _id?: string;
  name: string;
  slug: string;
  mattermostID: string;
}

export interface ChannelDocument extends Document, IChannel {
  _id: any;
}
export interface ChannelModel extends Model<ChannelDocument> {}

export const Channel: ChannelModel = model<ChannelDocument>(
  'Channel',
  ChannelSchema
);
