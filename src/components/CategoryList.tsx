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

export default function CategoryList() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">カテゴリー</h2>
        <div className="space-y-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.title}`}
              className="flex items-center group p-2 -mx-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex-shrink-0 w-12 h-12 relative rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                  {category.title}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}