import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await fs.mkdir(ARTICLES_DIR, { recursive: true });
    const filePath = path.join(ARTICLES_DIR, `${params.id}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    const article = JSON.parse(content);

    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json(
      { error: 'Article not found' },
      { status: 404 }
    );
  }
}