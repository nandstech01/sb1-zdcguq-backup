import Image from 'next/image';

const points = [
  {
    id: '01',
    title: '労働組合または弁護士が運営しているか',
    description: `退職の意思を勤務先に伝えるだけであれば、弁護士資格のない一般業者でも対応可能です。
ただし、勤務先から退職の時期や条件に関して協議や交渉を求められたときに、一般業者では対応できません（弁護士法違反に当たるため）。
そのため、協議・交渉もカバーしている労働組合が運営、または弁護士が運営する退職代行サービスを利用するのがベストです。`
  },
  {
    id: '02',
    title: '料金と対応範囲',
    description: `退職代行サービスによっては、基本料金に加えて後からオプション料金（残業代・退職金などの請求）が課金されるケースがあります。
そのため基本料金でどの範囲の業務を代行してもらえるのか、確認しておくと安心です。`
  },
  {
    id: '03',
    title: 'サポート体制がしっかりしているか',
    description: `退職時や退職後のサポート体制がある退職代行サービスがおすすめです。
退職届のテンプレート無料配布や転職支援サービスを行っている会社もあり、退職から転職までスムーズに事が進み非常に便利です。
また、退職できなかった際に全額返金を行ってくれるサービスもあります。`
  }
];

export default function ServicePoints() {
  return (
    <section className="mb-20">
      <div className="bg-indigo-900 text-white rounded-t-xl p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/features.jpg"
            alt="背景"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">退職代行サービス選びに</h2>
          <p className="text-2xl font-bold">失敗しないための3つのポイント</p>
        </div>
      </div>
      <div className="bg-white rounded-b-xl shadow-sm">
        <div className="divide-y divide-gray-200">
          {points.map((point) => (
            <div key={point.id} className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
                  <span className="text-xl font-bold text-indigo-600">{point.id}</span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{point.title}</h3>
                  <p className="text-gray-600 whitespace-pre-line">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}