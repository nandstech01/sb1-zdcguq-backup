'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Service {
  rank: number;
  name: string;
  image: string;
  rating: number;
  price: number;
  originalPrice?: number;
  features: string[];
}

const services: Service[] = [
  {
    rank: 1,
    name: "退職代行Jobs",
    image: "/images/services/jobs.jpg",
    rating: 5.0,
    price: 24800,
    originalPrice: 27000,
    features: ["弁護士監修", "後払いOK", "交渉可"]
  },
  {
    rank: 2,
    name: "退職代行ガーディアン",
    image: "/images/services/guardian.jpg",
    rating: 4.8,
    price: 24800,
    features: ["即日対応", "24時間対応", "全国対応"]
  },
  {
    rank: 3,
    name: "退職代行オイトマ",
    image: "/images/services/oitoma.jpg",
    rating: 4.2,
    price: 24000,
    features: ["安全性重視", "LINE相談可", "分割払い可"]
  }
];

type TabType = '総合' | '口コミ' | '詳しく見る';

export default function ServiceComparison() {
  const [activeTab, setActiveTab] = useState<TabType>('総合');

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        人気の退職代行サービス比較
      </h2>
      
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
          {(['総合', '口コミ', '詳しく見る'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">順位</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">サービス</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">評価</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">料金</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">特徴</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.rank} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`
                      flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold
                      ${service.rank === 1 ? 'bg-yellow-400' : service.rank === 2 ? 'bg-gray-400' : 'bg-orange-400'}
                    `}>
                      {service.rank}
                    </span>
                    {service.rank === 1 && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        人気No.1
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-5 w-5 ${i < service.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{service.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {service.originalPrice && (
                      <div className="line-through text-gray-500">
                        {service.originalPrice.toLocaleString()}円
                      </div>
                    )}
                    <div className="font-medium text-lg">
                      {service.price.toLocaleString()}円
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    詳細を見る
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}