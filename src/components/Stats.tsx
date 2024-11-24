import Image from 'next/image';

export default function Stats() {
  const stats = [
    { 
      id: 'total-reviews',
      value: '1,200',
      label: '累計口コミ数',
      suffix: '件',
      icon: '/images/icons/reviews.png'
    },
    { 
      id: 'companies',
      value: '50',
      label: '掲載サービス数',
      suffix: '社',
      icon: '/images/icons/companies.png'
    },
    { 
      id: 'articles',
      value: '300',
      label: '記事掲載数',
      suffix: '件',
      icon: '/images/icons/articles.png'
    },
    { 
      id: 'monthly-users',
      value: '10,000',
      label: '月間利用者数',
      suffix: '人',
      icon: '/images/icons/users.png'
    }
  ];

  return (
    <section className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div 
            key={stat.id} 
            className="bg-white p-6 rounded-xl shadow-sm text-center transform hover:scale-105 transition-transform duration-200"
          >
            <div className="flex justify-center mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}