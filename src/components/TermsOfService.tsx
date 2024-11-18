import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TermsOfService = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700">利用規約</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 text-sm text-gray-600 space-y-4">
              <h3 className="font-semibold text-gray-800">1. 個人情報の取り扱いについて</h3>
              <p>
                当院は、お客様から収集した個人情報を、以下の目的でのみ使用いたします：
                - サービス品質の向上
                - カスタマーサポートの提供
                - 新サービスの開発
                - マーケティング分析
              </p>

              <h3 className="font-semibold text-gray-800">2. アンケート回答の利用について</h3>
              <p>
                アンケートでいただいた回答は、個人を特定できない形で統計データとして使用させていただく場合があります。
                また、いただいたフィードバックは、サービス改善のための内部資料として活用させていただきます。
              </p>

              <h3 className="font-semibold text-gray-800">3. 情報の第三者提供について</h3>
              <p>
                お客様の個人情報は、法令に基づく場合を除き、お客様の同意なく第三者に提供することはありません。
              </p>

              <h3 className="font-semibold text-gray-800">4. クチコミの利用について</h3>
              <p>
                生成されたクチコミは、お客様ご自身の判断で投稿いただけます。
                投稿の有無は任意であり、投稿しないことによる不利益はございません。
              </p>

              <h3 className="font-semibold text-gray-800">5. セキュリティについて</h3>
              <p>
                当院は、お客様の個人情報を適切に管理し、漏洩、紛失、破壊、改ざん、不正アクセスなどを防止するため、
                必要なセキュリティ対策を講じています。
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};