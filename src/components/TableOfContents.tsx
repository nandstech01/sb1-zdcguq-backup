'use client';

import React, { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>('');
  const [headings, setHeadings] = useState<TOCItem[]>([]);

  useEffect(() => {
    // HTMLから見出しを抽出してTOCアイテムを生成
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3, h4');
    
    const items: TOCItem[] = Array.from(headingElements).map((heading) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent || '';
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return { id, text, level };
    });

    setHeadings(items);

    // 見出しにIDを付与
    const articleContent = document.querySelector('article');
    if (articleContent) {
      const articleHeadings = articleContent.querySelectorAll('h2, h3, h4');
      articleHeadings.forEach((heading) => {
        const text = heading.textContent || '';
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        heading.id = id;
      });
    }
  }, [content]);

  // スクロール時のアクティブな見出しの更新
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px'
      }
    );

    const headingElements = document.querySelectorAll('h2, h3, h4');
    headingElements.forEach((element) => observer.observe(element));

    return () => {
      headingElements.forEach((element) => observer.unobserve(element));
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="bg-gray-50 rounded-lg p-4 mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-xl font-bold text-gray-900">目次</h2>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      
      {isOpen && (
        <ul className="mt-4 space-y-2">
          {headings.map((item, index) => (
            <li
              key={index}
              style={{ 
                marginLeft: `${(item.level - 2) * 1.5}rem`,
                transition: 'all 0.2s'
              }}
            >
              <a
                href={`#${item.id}`}
                className={`
                  block py-1 px-2 rounded text-sm
                  ${activeId === item.id 
                    ? 'text-white bg-indigo-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item.id);
                  if (element) {
                    const yOffset = -100;
                    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}