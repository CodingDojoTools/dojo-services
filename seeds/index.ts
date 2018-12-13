import * as mongoose from 'mongoose';

import { uri, options } from '../server/config';
import { LocationSeeder } from './location.seed';
import { StackVariantSeeder } from './stack-variant.seed';

const seeders: any[] = [LocationSeeder, StackVariantSeeder];

async function run(seeds: any[]) {
  await mongoose.connect(
    uri,
    options
  );

  const results = await Promise.all(
    seeds
      .map(Seed => new Seed())
      .map(async seed => {
        const result = await seed.seed();

        return `${seed.name} created ${result.created} new documents`;
      })
  );

  await mongoose.connection.close();

  results.forEach(result => console.log(result));

  process.exit(0);
}

run(seeders);
