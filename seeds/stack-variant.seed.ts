import { Seeder } from './seeder.seed';
import { StackVariant } from '../server/models';

const variants = [
  {
    type: 'Online',
  },
  {
    type: 'Onsite',
  },
];

export class StackVariantSeeder extends Seeder {
  async shouldRun() {
    return await StackVariant.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return await StackVariant.create(variants);
  }
}
