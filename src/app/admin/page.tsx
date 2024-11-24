'use client';

import { useState } from 'react';
import { marked } from 'marked';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [outline, setOutline] = useState('');
  const [keywords, setKeywords] = useState('');
  const [category, setCategory] = useState('パワハラ');
  const [preview, setPreview] = useState<{ title: string; content: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const formData = {
        title,
        outline: outline.split('\n').filter(line => line.trim()),
        keywords: keywords.split(',').map(k => k.trim()),
        category
      };

      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('記事の生成に失敗しました');
      }

      const { content } = await response.json();
      setPreview({
        title,
        content: marked(content)
      });
    } catch (error) {
      console.error('Error generating article:', error);
      alert('記事の生成中にエラーが発生しました。');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!preview) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content: preview.content,
          category,
          keywords: keywords.split(',').map(k => k.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error('記事の保存に失敗しました');
      }

      alert('記事を保存しました');
      // フォームをリセット
      setTitle('');
      setOutline('');
      setKeywords('');
      setCategory('パワハラ');
      setPreview(null);
    } catch (error) {
      console.error('Error saving article:', error);
      alert('記事の保存中にエラーが発生しました。');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">記事作成</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">タイトル</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">記事構成（1行1見出し）</label>
              <textarea
                value={outline}
                onChange={(e) => setOutline(e.target.value)}
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="1. パワハラとは？&#13;&#10;2. パワハラの種類&#13;&#10;3. 退職代行を使うメリット"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">カテゴリー</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {['パワハラ', 'ブラック企業', '長時間労働', '心の病', '女性特有の職場トラブル'].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">キーワード (カンマ区切り)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="退職代行 愛知県 即日, 退職代行 パワハラ 即退職"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              >
                {isGenerating ? '生成中...' : '記事を生成'}
              </button>
              {preview && (
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  {isSaving ? '保存中...' : '記事を保存'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">プレビュー</h2>
          {preview && (
            <article className="prose prose-lg max-w-none">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">{preview.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: preview.content }} />
            </article>
          )}
        </div>
      </div>
    </div>
  );
}