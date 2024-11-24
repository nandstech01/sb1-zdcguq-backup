import Link from 'next/link';
import Image from 'next/image';
import { getPopularArticles } from '@/lib/articles';

export default async function PopularArticles() {
  const articles = await getPopularArticles(5);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">人気の記事</h2>
        <div className="space-y-4">
          {articles.map((article) => (
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
                    {article.views} views
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