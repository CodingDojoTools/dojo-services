import { Location } from '../server/models';
import { Seeder } from './seeder.seed';

const locations = [
  {
    city: 'Online',
    alias: 'WorldWide',
  },
  {
    city: 'Bellevue',
    alias: 'Seattle',
  },
  {
    city: 'San Jose',
    alias: 'Silicon Valley',
  },
  {
    city: 'Tulsa',
  },
  {
    city: 'Chicago',
  },
  {
    city: 'Tysons Corner',
    alias: 'N.O.V.A.',
  },
  {
    city: 'Berkeley',
    alias: 'East Bay',
  },
  {
    city: 'Dallas',
  },
  {
    city: 'Burbank',
    alias: 'Los Angeles',
  },
];

export class LocationSeeder extends Seeder {
  async shouldRun() {
    return await Location.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return await Location.create(locations);
  }
}
