import Link from 'next/link';
import Image from 'next/image';
import { searchArticles } from '@/lib/articles';
import Pagination from '@/components/Pagination';

interface SearchResultsProps {
  query?: string;
  category?: string;
  page: number;
}

export default async function SearchResults({ query, category, page }: SearchResultsProps) {
  const { articles, total } = await searchArticles({
    query,
    category: category === 'すべて' ? undefined : category,
    page,
    limit: 10
  });

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">検索条件に一致する記事が見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        {total}件の記事が見つかりました
      </p>

      <div className="space-y-6">
        {articles.map((article) => (
          <article key={article.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <div className="h-48 w-full md:w-48 relative">
                  <Image
                    src={`/images/blog/${article.id}.jpg`}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <time dateTime={article.createdAt}>
                    {new Date(article.createdAt).toLocaleDateString('ja-JP')}
                  </time>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {article.category}
                  </span>
                </div>
                <Link 
                  href={`/articles/${article.id}`}
                  className="block group"
                >
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 mb-2">
                    {article.title}
                  </h2>
                </Link>
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
              </div>
            </div>
          </article>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(total / 10)}
        baseUrl={`/search?q=${query || ''}&category=${category || ''}`}
      />
    </div>
  );
}