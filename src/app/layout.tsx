import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '退職代行比較ナビ',
  description: '退職代行サービスの比較・紹介サイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <a href="/" className="flex items-center">
                  <span className="text-xl font-bold text-gray-900">退職代行比較ナビ</span>
                </a>
              </div>
              <div className="flex items-center">
                <a href="/articles" className="text-gray-900 hover:text-gray-600 px-3 py-2">
                  記事一覧
                </a>
              </div>
            </div>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer className="bg-white mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-gray-500">&copy; 2024 退職代行比較ナビ</p>
          </div>
        </footer>
      </body>
    </html>
  );
}