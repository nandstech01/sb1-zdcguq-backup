import Image from 'next/image';

export default function EditorInfo() {
  return (
    <section className="mb-20">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-red-600 mb-8">運営者情報</h2>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 relative mb-4">
              <Image
                src="/images/editor.jpg"
                alt="編集長"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">退職代行比較ナビ運営者</h3>
            <p className="text-lg font-bold text-gray-900 mb-4">山田 咲良</p>
            <div className="flex gap-4 mb-6">
              <a href="https://twitter.com/taisyoku_navi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="mailto:info@taisyoku-navi.com" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Email</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
            <div className="text-gray-600 space-y-4">
              <p>大手法律事務所にて4年間、労働問題専門の部署に所属。数多くのパワハラ・退職トラブル案件に携わり、働く人々の権利を守る活動に従事してきました。その経験から、より多くの方々の力になりたいと考え、独立を決意。</p>
              <p>法律の専門知識と実務経験を活かし、退職代行サービスの比較・検証を行うサイトを立ち上げました。利用者目線に立ち、実際にサービスを利用して検証を行い、信頼性の高い情報提供を心がけています。</p>
              <p>2023年10月1日より、ステルスマーケティングが景品表示法違反となる中、退職代行業界においても透明性の高い情報提供が求められています。当サイトでは、以下の3つの価値観を大切にしています：</p>
              <p className="font-bold">【中立性】【専門性】【透明性】</p>
              <p>これらの価値観に基づき、すべてのサービス比較において、同一の評価基準による公平な検証を実施。法的観点からの評価も加え、利用者の方々が安心して選択できる情報を提供しています。</p>
              <p>各サービスの評価には、実際の利用体験や法的な観点からの分析結果を含め、具体的な根拠を示すことで、情報の信頼性を担保しています。</p>
              <p>退職は人生の大きな転機です。この重要な決断において、当サイトが皆様の適切な判断材料となり、より良い未来への一歩を踏み出すお手伝いができれば幸いです。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}