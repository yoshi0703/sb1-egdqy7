import { motion } from 'framer-motion';
import { TextArea } from './TextArea';

interface FreeFormQuestionnaireProps {
  value: string;
  onChange: (value: string) => void;
}

export const FreeFormQuestionnaire = ({ value, onChange }: FreeFormQuestionnaireProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          施術やサービスについて、その他のご意見やご要望がございましたら、ご自由にお書きください。
        </p>
        
        <TextArea
          value={value}
          onChange={onChange}
          label=""
          placeholder="例：待合室にウォーターサーバーがあると嬉しいです、予約の取りやすさ、スタッフの対応など"
        />
      </div>

      <div className="text-sm text-gray-500 mt-4">
        <p>※ご意見は今後のサービス改善に活用させていただきます。</p>
      </div>
    </motion.div>
  );
};