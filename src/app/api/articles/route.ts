import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');

const articleSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
  keywords: z.array(z.string()),
});

// 記事の保存
export async function POST(request: Request) {
  try {
    const input = articleSchema.parse(await request.json());
    
    // データディレクトリの作成
    await fs.mkdir(ARTICLES_DIR, { recursive: true });

    const article = {
      id: crypto.randomUUID(),
      ...input,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await fs.writeFile(
      path.join(ARTICLES_DIR, `${article.id}.json`),
      JSON.stringify(article, null, 2)
    );

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error saving article:', error);
    return NextResponse.json(
      { error: 'Failed to save article' },
      { status: 500 }
    );
  }
}

// 記事一覧の取得
export async function GET() {
  try {
    await fs.mkdir(ARTICLES_DIR, { recursive: true });
    
    const files = await fs.readdir(ARTICLES_DIR);
    const articles = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(path.join(ARTICLES_DIR, file), 'utf-8');
        return JSON.parse(content);
      })
    );

    // 作成日時の新しい順にソート
    articles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}