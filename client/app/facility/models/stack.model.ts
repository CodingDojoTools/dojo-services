import { ImageBuffer } from '@app/core';

export interface Stack {
  _id: string;
  name: string;
  image: ImageBuffer;
  variant: string;
  active: boolean;
}
