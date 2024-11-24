'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const debouncedSearch = useDebounce((value: string) => {
    if (value) {
      router.push(`/search?q=${encodeURIComponent(value)}`);
    }
  }, 500);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="記事を検索..."
        className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
}