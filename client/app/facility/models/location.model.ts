import { ImageBuffer } from '@app/core';
export interface Location {
  _id: string;
  alias: string;
  city: string;
  address: string;
  image?: ImageBuffer;
  phone: string;
  stacks: string[];
  employees: string[];
}
