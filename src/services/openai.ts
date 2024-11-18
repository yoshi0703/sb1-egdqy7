import OpenAI from 'openai';
import type { FeedbackData } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateReview(data: FeedbackData): Promise<string> {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error('APIキーが設定されていません。.envファイルを確認してください。');
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "あなたは整骨院の口コミを生成するプロフェッショナルです。お客様の声を正確に反映することを心がけてください。"
        },
        {
          role: "user",
          content: `
次のアンケート回答をもとに、性別と年齢に応じた適切な口コミを生成してください。性別と年齢に関する直接的な情報は含めないでください。口コミはポジティブなトーンで、原文を意識しつつ具体的な症状、満足度、施術後の感想を反映したものにしてください。口コミの長さは100〜150文字程度で、一般の人が参考にしやすい内容（具体的な症状や満足度、施術後の感想も反映してください）にしてください。その他のご意見・ご要望は、お客様の意図を損なわないよう、できるだけ原文の表現を活かして反映してください。

- 年齢層: ${data.ageGroup}
- 性別: ${data.gender}
- 評価: ${data.rating}点/5点
- 施術前の症状: ${data.previousSymptoms}
- 施術後の変化: ${data.bodyChanges}
- 良かった点: ${data.appreciatedAspects}
- 施術内容の理解: ${data.treatmentUnderstanding}
- その他のご意見・ご要望: ${data.otherFeedback}
`
        }
      ],
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 500,
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('レビューの生成に失敗しました。APIからの応答が不正です。');
    }

    return completion.choices[0].message.content;

  } catch (error) {
    console.error('OpenAI APIエラー:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        throw new Error('APIキーが無効です。正しいAPIキーを設定してください。');
      } else if (error.message.includes('429')) {
        throw new Error('APIリクエスト制限に達しました。しばらく待ってから再試行してください。');
      } else if (error.message.includes('insufficient_quota')) {
        throw new Error('APIの利用制限に達しました。請求設定を確認してください。');
      }
    }
    
    throw new Error('レビューの生成中にエラーが発生しました。もう一度お試しください。');
  }
}