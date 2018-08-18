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

  seeds.forEach(async Seed => {
    const results = await new Seed().seed();

    console.log(`${Seed.name} created ${results.created} new documents`);
  });
  setTimeout(function() {
    mongoose.connection.close();
    process.exit(0);
  }, 1000);
}

run(seeders);
