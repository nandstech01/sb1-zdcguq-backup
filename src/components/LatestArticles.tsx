import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types/article';

interface LatestArticlesProps {
  articles: Article[];
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">最新の記事</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/articles/${article.id}`}
            className="group block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              <Image
                src={`/images/blog/${article.id}.jpg`}
                alt={article.title}
                width={800}
                height={450}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(article.createdAt).toLocaleDateString('ja-JP')}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                {article.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          href="/articles"
          className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
        >
          記事一覧をもっと見る
        </Link>
      </div>
    </section>
  );
}