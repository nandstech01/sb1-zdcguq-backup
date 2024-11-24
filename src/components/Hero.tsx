import Link from 'next/link';

export default function Hero() {
  return (
    <section className="text-center mb-20">
      <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
        退職代行サービスを
        <span className="text-indigo-600">比較・検討</span>
        するなら
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        実際の利用者の口コミや料金比較で、あなたに最適な退職代行サービスが見つかります。
        中立的な立場で信頼できる情報を提供します。
      </p>
      <Link
        href="/articles"
        className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
      >
        サービス一覧を見る
      </Link>
    </section>
  );
}