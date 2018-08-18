import { Location } from '../server/models';
import { Seeder } from './seeder.seed';

const locations = [
  {
    city: 'Online',
  },
  {
    city: 'Bellevue',
  },
  {
    city: 'San Jose',
  },
  {
    city: 'Tulsa',
  },
  {
    city: 'Chicago',
  },
  {
    city: 'Tysons Corner',
  },
  {
    city: 'East Bay',
  },
  {
    city: 'Dallas',
  },
  {
    city: 'Burbank',
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
