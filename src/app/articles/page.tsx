import Link from 'next/link';
import { Article } from '@/types/article';

async function getArticles() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('記事の取得に失敗しました');
  return res.json();
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">記事一覧</h1>
      <div className="grid gap-6">
        {articles.map((article: Article) => (
          <article key={article.id} className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              <Link href={`/articles/${article.id}`} className="hover:text-indigo-600">
                {article.title}
              </Link>
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{new Date(article.createdAt).toLocaleDateString('ja-JP')}</span>
              <span>カテゴリー: {article.category}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {article.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}