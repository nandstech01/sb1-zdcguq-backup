import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getArticlesByCategory } from '@/lib/articles';
import { Article } from '@/types/article';

export default async function CategoryPage({
  params
}: {
  params: { category: string };
}) {
  const decodedCategory = decodeURIComponent(params.category);
  const articles = await getArticlesByCategory(decodedCategory);

  if (articles.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {decodedCategory}に関する記事一覧
      </h1>

      <div className="grid gap-6">
        {articles.map((article: Article) => (
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
                  <span>{new Date(article.createdAt).toLocaleDateString('ja-JP')}</span>
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
    </div>
  );
}