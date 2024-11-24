import fs from 'fs/promises';
import path from 'path';
import { db } from '@/db';
import { articles } from '@/db/schema';

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');

async function migrateJsonToSqlite() {
  try {
    // JSONファイルの読み込み
    const files = await fs.readdir(ARTICLES_DIR);
    
    for (const file of files) {
      const content = await fs.readFile(path.join(ARTICLES_DIR, file), 'utf-8');
      const article = JSON.parse(content);

      // SQLiteへの挿入
      await db.insert(articles).values({
        id: article.id,
        title: article.title,
        content: article.content,
        category: article.category,
        keywords: JSON.stringify(article.keywords),
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        views: '0'
      }).onConflictDoNothing();

      console.log(`Migrated article: ${article.title}`);
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateJsonToSqlite();