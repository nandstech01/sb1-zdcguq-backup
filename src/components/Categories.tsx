import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: 'power-harassment',
    title: 'パワハラ',
    description: 'パワハラに悩む方向けの退職サポート情報',
    icon: '😣',
    image: '/images/categories/power-harassment.jpg'
  },
  {
    id: 'black-company',
    title: 'ブラック企業',
    description: '過酷な労働環境からの脱出方法',
    icon: '🏢',
    image: '/images/categories/black-company.jpg'
  },
  {
    id: 'overwork',
    title: '長時間労働',
    description: '残業過多・休日出勤でお悩みの方へ',
    icon: '⏰',
    image: '/images/categories/overwork.jpg'
  },
  {
    id: 'mental-health',
    title: '心の病',
    description: 'メンタルヘルスの問題を抱える方向け',
    icon: '🧠',
    image: '/images/categories/mental-health.jpg'
  },
  {
    id: 'women-issues',
    title: '女性特有の職場トラブル',
    description: 'セクハラ・マタハラなどの問題解決',
    icon: '👩',
    image: '/images/categories/women-issues.jpg'
  }
];

export default function Categories() {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">お悩みの種類から探す</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.title}`}
            className="group block p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-4 group-hover:scale-110 transition-transform duration-200" role="img" aria-label={category.title}>
                {category.icon}
              </span>
              <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}