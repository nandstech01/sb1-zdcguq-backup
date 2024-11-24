import { Article } from '@/types/article';
import path from 'path';
import fs from 'fs/promises';
import { getDb } from '@/db';
import { articles } from '@/db/schema';
import { eq } from 'drizzle-orm';

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');

// 最新の記事を取得
export async function getLatestArticles(limit: number = 3): Promise<Article[]> {
  try {
    const files = await fs.readdir(ARTICLES_DIR);
    const articles = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(path.join(ARTICLES_DIR, file), 'utf-8');
        return JSON.parse(content);
      })
    );

    // 作成日時の新しい順にソート
    articles.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return articles.slice(0, limit);
  } catch (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }
}

// カテゴリーで記事を取得
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const files = await fs.readdir(ARTICLES_DIR);
    const articles = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(path.join(ARTICLES_DIR, file), 'utf-8');
        return JSON.parse(content);
      })
    );

    return articles
      .filter(article => article.category === category)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}

// IDで記事を取得
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const filePath = path.join(ARTICLES_DIR, `${id}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error fetching article by id:', error);
    return null;
  }
}

// 記事を検索
export async function searchArticles({
  query,
  category,
  page = 1,
  limit = 10
}: {
  query?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const files = await fs.readdir(ARTICLES_DIR);
    const articles = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(path.join(ARTICLES_DIR, file), 'utf-8');
        return JSON.parse(content);
      })
    );

    let filteredArticles = articles;

    if (query) {
      const searchRegex = new RegExp(query, 'i');
      filteredArticles = filteredArticles.filter(article =>
        searchRegex.test(article.title) || 
        searchRegex.test(article.content)
      );
    }

    if (category && category !== 'すべて') {
      filteredArticles = filteredArticles.filter(article =>
        article.category === category
      );
    }

    // 作成日時の新しい順にソート
    filteredArticles.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      articles: filteredArticles.slice(start, end),
      total: filteredArticles.length
    };
  } catch (error) {
    console.error('Error searching articles:', error);
    return { articles: [], total: 0 };
  }
}

// 人気記事を取得
export async function getPopularArticles(limit: number = 5): Promise<Article[]> {
  try {
    const db = await getDb();
    const result = await db.select().from(articles).orderBy(articles.views).limit(limit);
    return result;
  } catch (error) {
    console.error('Error fetching popular articles:', error);
    return [];
  }
}

// 記事のビュー数をインクリメント
export async function incrementViews(id: string): Promise<void> {
  try {
    const db = await getDb();
    const article = await db.select().from(articles).where(eq(articles.id, id)).get();
    
    if (article) {
      const currentViews = parseInt(article.views || '0', 10);
      await db
        .update(articles)
        .set({ views: (currentViews + 1).toString() })
        .where(eq(articles.id, id));
    }
  } catch (error) {
    console.error('Error incrementing views:', error);
  }
}