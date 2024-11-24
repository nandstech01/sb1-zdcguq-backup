import Link from 'next/link';
import Image from 'next/image';
import { getArticlesByCategory } from '@/lib/articles';

interface RelatedArticlesProps {
  currentArticleId: string;
  category: string;
}

export default async function RelatedArticles({ currentArticleId, category }: RelatedArticlesProps) {
  const articles = await getArticlesByCategory(category);
  const relatedArticles = articles
    .filter(article => article.id !== currentArticleId)
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">関連記事</h2>
        <div className="space-y-4">
          {relatedArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="block group"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                    <Image
                      src={`/images/blog/${article.id}.jpg`}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}