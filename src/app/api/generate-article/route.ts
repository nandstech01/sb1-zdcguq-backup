import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';

const articleInputSchema = z.object({
  title: z.string().min(1),
  outline: z.array(z.string()),
  keywords: z.array(z.string()),
  category: z.string(),
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const input = articleInputSchema.parse(await request.json());

    const systemPrompt = `あなたはSEOに詳しく、SEOに強いブログ記事をライティングするプロのライターです。
以下のルールに従って記事を生成してください：

1. ですます調で書く
2. 「ます」「ます」「ます」など同じ語尾を3回連続で繰り返さない
3. 専門用語は平易な言葉で説明する
4. 漢字：ひらがな：カタカナの割合は2:7:1
5. 1文は40～50文字を基本とする
6. 箇条書きや表を効果的に使用する
7. 「これ」「ここ」「こちら」などの指示代名詞をなるべく使わない
8. 主語と述語の位置を近づける
9. 二重表現は使わない
10. 読者が読み飛ばしても理解できるように書く
11. 「そして」「また」のような順接や並列の接続詞はなるべく使わない
12. 断定表現を使う
13. 見出しレベルを正しく設定する（最上位はh1で1つのみ、以降はh2, h3, h4の順）
14. 3000文字程度の記事を生成する
15. 各セクションの冒頭で、そのセクションの要点を太字で強調する`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `
タイトル：${input.title}
カテゴリー：${input.category}
キーワード：${input.keywords.join(', ')}
記事構成：
${input.outline.join('\n')}

上記の情報を基に、以下の形式で記事を生成してください：

1. タイトルはh1タグで1つだけ作成
2. 大きな区切りはh2タグ
3. サブセクションはh3タグ
4. 詳細項目はh4タグ
5. 各セクションは300-500文字程度
6. 読者の悩みに寄り添った具体的な内容
7. 見出しの前後に適切な空白を入れる
8. 各セクションの重要なポイントを太字で強調

見出しはMarkdown形式ではなくHTMLタグで記述してください。` }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const content = completion.choices[0].message.content || '';

    return NextResponse.json({ content });

  } catch (error) {
    console.error('Error generating article:', error);
    return NextResponse.json(
      { error: '記事の生成中にエラーが発生しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}