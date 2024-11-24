'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  'すべて',
  'パワハラ',
  'ブラック企業',
  '長時間労働',
  '心の病',
  '女性特有の職場トラブル'
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'すべて';

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', category);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
            category === currentCategory
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}