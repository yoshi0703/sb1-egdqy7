import { useState, useEffect } from 'react';
import { Pencil, Loader2, AlertCircle, Star, Gift, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import type { FeedbackData } from '../types';
import { generateReview } from '../services/openai';
import { canGenerateReview, incrementReviewCount, getRemainingAttempts } from '../services/reviewLimit';
import { REVIEW_LIMITS } from '../config/constants';

interface ReviewGeneratorProps {
  data: FeedbackData;
}

export const ReviewGenerator = ({ data }: ReviewGeneratorProps) => {
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState<string>('');
  const [remainingAttempts, setRemainingAttempts] = useState(REVIEW_LIMITS.DAILY_LIMIT);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const GOOGLE_REVIEW_URL = "https://maps.app.goo.gl/sBR2qDJM6UW7grDJ9";

  useEffect(() => {
    const generateContent = async () => {
      try {
        setIsLoading(true);
        setError('');

        if (!canGenerateReview()) {
          throw new Error(`本日のクチコミ生成回数の上限(${REVIEW_LIMITS.DAILY_LIMIT}回)に達しました。明日以降に再度お試しください。`);
        }

        const generatedReview = await generateReview(data);
        incrementReviewCount();
        setRemainingAttempts(getRemainingAttempts());
        setReview(generatedReview);
        setEditedReview(generatedReview);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'クチコミの生成に失敗しました';
        setError(errorMessage);
        console.error('クチコミ生成エラー:', err);
      } finally {
        setIsLoading(false);
      }
    };

    generateContent();
  }, [data]);

  const handleCopyAndPost = async () => {
    try {
      await navigator.clipboard.writeText(editedReview);
      setShowCopySuccess(true);
      setTimeout(() => {
        setShowCopySuccess(false);
        window.open(GOOGLE_REVIEW_URL, '_blank');
      }, 1000);
    } catch (err) {
      console.error('クリップボードへのコピーに失敗しました:', err);
      window.open(GOOGLE_REVIEW_URL, '_blank');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500 rounded-lg">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              アンケートにご協力いただき、ありがとうございます！
            </h3>
            <p className="text-blue-700">
              次回ご来院時に使える500円割引クーポンを進呈いたします。この画面をスタッフにお見せください。
            </p>
          </div>
        </div>
      </motion.div>

      <div className="text-center mb-8">
        <motion.h2 
          className="text-2xl font-semibold text-gray-800 mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          投稿用クチコミを生成しました
        </motion.h2>
        <p className="text-gray-600">
          ワンクリックでGoogleマップに投稿できます
        </p>
        <p className="text-sm text-gray-500 mt-2">
          ※投稿は任意です。アンケートのみでも十分なご協力をいただき、ありがとうございます。
        </p>
      </div>

      <motion.div 
        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-[200px]">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">クチコミを生成中...</span>
            </div>
          ) : error ? (
            <motion.div 
              className="flex items-center justify-center h-[200px] text-red-500"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <AlertCircle className="w-6 h-6 mr-2" />
              <span>{error}</span>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="flex items-center gap-1 mb-4"
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                {[...Array(data.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </motion.div>
              {isEditing ? (
                <textarea
                  value={editedReview}
                  onChange={(e) => setEditedReview(e.target.value)}
                  className="clay-input min-h-[200px] resize-none"
                />
              ) : (
                <motion.p 
                  className="text-gray-700 whitespace-pre-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {editedReview}
                </motion.p>
              )}
            </motion.div>
          )}
        </div>

        <motion.div 
          className="border-t border-gray-100 p-4 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              disabled={isLoading || !!error}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <Pencil size={16} />
              {isEditing ? '完了' : '編集する'}
            </motion.button>
            <div className="relative flex flex-col items-end gap-2">
              <motion.button
                onClick={handleCopyAndPost}
                disabled={isLoading || !!error}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors group w-full"
              >
                <ExternalLink size={16} className="transition-transform group-hover:scale-110" />
                {showCopySuccess ? 'コピーしました！' : 'クチコミを投稿する'}
              </motion.button>
              {!showCopySuccess && (
                <motion.div 
                  className="text-xs text-gray-600 mt-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  タップするとクチコミがコピーされ、Googleマップが開きます
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="text-center mt-8 p-6 bg-white rounded-xl border border-gray-100 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="font-semibold text-gray-800 mb-2">投稿手順</h3>
        <ol className="text-sm text-gray-600 space-y-2 text-left list-decimal list-inside">
          <li>「クチコミを投稿する」ボタンをクリック</li>
          <li>クチコミが自動でコピーされ、Googleマップが開きます</li>
          <li>口コミ欄に貼り付けて、星評価を選択</li>
          <li>投稿ボタンを押して完了</li>
        </ol>
      </motion.div>

      <motion.div 
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <p className="text-sm text-gray-500">
          皆様からいただいたご意見は、より良いサービスの提供に活かしてまいります。
        </p>
      </motion.div>
    </motion.div>
  );
};