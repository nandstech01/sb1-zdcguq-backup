import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { getArticleById, incrementViews } from '@/lib/articles';
import TableOfContents from '@/components/TableOfContents';
import ShareButtons from '@/components/ShareButtons';
import RelatedArticles from '@/components/RelatedArticles';
import AuthorInfo from '@/components/AuthorInfo';
import PopularArticles from '@/components/PopularArticles';
import CategoryList from '@/components/CategoryList';
import SearchBox from '@/components/SearchBox';

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);
  
  if (!article) {
    notFound();
  }

  // 記事のビュー数をインクリメント
  await incrementViews(params.id);

  marked.use({
    headerIds: true,
    headerPrefix: '',
    gfm: true,
  });

  const content = marked(article.content);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* メイン記事コンテンツ */}
        <article className="lg:col-span-2 prose prose-lg max-w-none bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <time dateTime={article.createdAt}>
                  {new Date(article.createdAt).toLocaleDateString('ja-JP')}
                </time>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {article.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
              <div className="flex flex-wrap gap-2">
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

            <ShareButtons title={article.title} />
            <TableOfContents content={content} />

            <div 
              className="mt-8 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h2:mt-12 prose-h3:mt-8 prose-h4:mt-6 prose-p:leading-relaxed prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:pl-4 prose-blockquote:italic prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: content }} 
            />

            <AuthorInfo />
          </div>
        </article>

        {/* サイドバー */}
        <aside className="space-y-8">
          <SearchBox />
          <CategoryList />
          <PopularArticles />
          <RelatedArticles 
            currentArticleId={article.id} 
            category={article.category}
          />
        </aside>
      </div>
    </div>
  );
}