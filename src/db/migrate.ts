import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import * as schema from './schema';

const client = createClient({
  url: 'file:sqlite.db',
});

const db = drizzle(client, { schema });

// マイグレーションを実行
console.log('Running migrations...');

async function main() {
  try {
    await migrate(db, { migrationsFolder: 'src/db/migrations' });
    console.log('Migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main();