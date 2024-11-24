import Image from 'next/image';

export default function AuthorInfo() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="relative h-16 w-16">
            <Image
              src="/images/editor.jpg"
              alt="山田 咲良"
              fill
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-bold text-gray-900">山田 咲良</h3>
          <p className="text-sm text-gray-600">
            退職代行比較ナビ編集長。大手法律事務所での4年間の経験を活かし、
            退職代行サービスの比較・検証を行っています。
          </p>
        </div>
      </div>
    </div>
  );
}