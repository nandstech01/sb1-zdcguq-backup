import { getLatestArticles } from '@/lib/articles';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ServiceComparison from '@/components/ServiceComparison';
import Categories from '@/components/Categories';
import ServicePoints from '@/components/ServicePoints';
import LatestArticles from '@/components/LatestArticles';
import EditorInfo from '@/components/EditorInfo';

export default async function HomePage() {
  const latestArticles = await getLatestArticles(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Hero />
        <Stats />
        <ServiceComparison />
        <Categories />
        <LatestArticles articles={latestArticles} />
        <ServicePoints />
        <EditorInfo />
      </div>
    </div>
  );
}