import type { Config } from 'drizzle-kit';

const config: Config = {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  driver: 'better-sqlite',
  dbCredentials: {
    url: 'sqlite.db',
  },
};

export default config;