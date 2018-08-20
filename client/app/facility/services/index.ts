import { LocationService } from './location.service';
import { UserService } from './user.service';

export const services: any[] = [LocationService, UserService];

export * from './location.service';
export * from './user.service';
