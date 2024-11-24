'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

const categories = [
  'すべて',
  'パワハラ',
  'ブラック企業',
  '長時間労働',
  '心の病',
  '女性特有の職場トラブル'
];

interface SearchFormProps {
  initialQuery?: string;
  initialCategory?: string;
}

export default function SearchForm({ initialQuery = '', initialCategory = 'すべて' }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const debouncedSearch = useDebounce((value: string) => {
    if (value) {
      router.push(`/search?${createQueryString('q', value)}`);
    } else {
      router.push('/search');
    }
  }, 500);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    router.push(`/search?${createQueryString('category', value)}`);
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            キーワード検索
          </label>
          <div className="mt-1">
            <input
              type="search"
              name="search"
              id="search"
              value={query}
              onChange={handleQueryChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="検索キーワードを入力..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            カテゴリー
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}