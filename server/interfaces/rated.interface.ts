import { Rateable } from './rateable.interface';

export interface Rated {
  source: string;
  filename: string;
  ratings: Array<Rateable>;
  bestMatch: Rateable;
}
