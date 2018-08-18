export abstract class Seeder {
  async seed() {
    await this.beforeRun();

    let results = null;

    if (await this.shouldRun()) {
      results = await this.run();
    }

    return this.getStats(results);
  }

  async shouldRun() {
    return true;
  }

  async beforeRun() {}

  abstract async run(): Promise<any[]>;

  getStats(results: any) {
    if (Array.isArray(results)) {
      return { run: true, created: results.length };
    }

    return { run: false, created: 0 };
  }
}
