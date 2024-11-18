import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarRating } from './components/StarRating';
import { ProgressBar } from './components/ProgressBar';
import { TextArea } from './components/TextArea';
import { Navigation } from './components/Navigation';
import { ReviewGenerator } from './components/ReviewGenerator';
import { DemographicSelect } from './components/DemographicSelect';
import { FreeFormQuestionnaire } from './components/FreeFormQuestionnaire';
import { TermsOfService } from './components/TermsOfService';
import { QuestionHeader } from './components/QuestionHeader';
import type { FeedbackData } from './types';

function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FeedbackData>({
    ageGroup: '',
    gender: '',
    rating: 0,
    bodyChanges: '',
    appreciatedAspects: '',
    recommendation: '',
    previousSymptoms: '',
    treatmentUnderstanding: '',
    otherFeedback: '',
  });

  const updateData = (updates: Partial<FeedbackData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 8));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <QuestionHeader title="基本情報を教えてください" />
            <DemographicSelect
              ageGroup={data.ageGroup}
              gender={data.gender}
              onAgeGroupChange={(ageGroup) => updateData({ ageGroup })}
              onGenderChange={(gender) => updateData({ gender })}
            />
          </>
        );
      case 2:
        return (
          <div className="space-y-6">
            <QuestionHeader title="全体的な満足度を評価してください" />
            <StarRating
              rating={data.rating}
              onRatingChange={(rating) => updateData({ rating })}
            />
          </div>
        );
      case 3:
        return (
          <>
            <QuestionHeader title="施術前にどのような症状がありましたか？" />
            <TextArea
              value={data.previousSymptoms}
              onChange={(value) => updateData({ previousSymptoms: value })}
              label=""
              placeholder="肩こり、腰痛、全身の疲労、姿勢のゆがみなど、感じていた症状についてお書きください"
            />
          </>
        );
      case 4:
        return (
          <>
            <QuestionHeader title="施術後の改善について教えてください" />
            <TextArea
              value={data.bodyChanges}
              onChange={(value) => updateData({ bodyChanges: value })}
              label=""
              placeholder="肩こりや腰痛がどのように改善されたか、またはその他の変化について詳しくお書きください"
            />
          </>
        );
      case 5:
        return (
          <>
            <QuestionHeader title="特に良かった点を教えてください" />
            <TextArea
              value={data.appreciatedAspects}
              onChange={(value) => updateData({ appreciatedAspects: value })}
              label=""
              placeholder="施術の技術、スタッフの対応、リラックスできる環境など、具体的にお書きください"
            />
          </>
        );
      case 6:
        return (
          <>
            <QuestionHeader title="施術内容の説明は分かりやすかったですか？" />
            <TextArea
              value={data.treatmentUnderstanding}
              onChange={(value) => updateData({ treatmentUnderstanding: value })}
              label=""
              placeholder="施術の流れや効果の説明が分かりやすかったか、安心感があったかについて教えてください"
            />
          </>
        );
      case 7:
        return (
          <>
            <QuestionHeader title="その他のご意見・ご要望" />
            <FreeFormQuestionnaire
              value={data.otherFeedback}
              onChange={(value) => updateData({ otherFeedback: value })}
            />
          </>
        );
      case 8:
        return <ReviewGenerator data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 bg-gradient-to-br from-blue-50/40 via-white/60 to-purple-50/40">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
            いなば針灸整骨院
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <h2 className="text-xl text-gray-600 mb-8">
            施術体験をお聞かせください
          </h2>
          <ProgressBar currentStep={step} totalSteps={8} />
        </div>

        <div className="clay-card p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[300px]"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <Navigation 
            step={step}
            data={data}
            onNext={nextStep}
            onPrev={prevStep}
          />
        </div>

        <TermsOfService />
      </div>
    </div>
  );
}

export default App;