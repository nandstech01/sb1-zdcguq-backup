'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const searchParams = useSearchParams();
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `${baseUrl}&${params.toString()}`;
  };

  return (
    <nav className="flex justify-center space-x-1 mt-8">
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          前へ
        </Link>
      )}
      
      {pages.map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            page === currentPage
              ? 'text-white bg-indigo-600 hover:bg-indigo-700'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </Link>
      ))}
      
      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          次へ
        </Link>
      )}
    </nav>
  );
}