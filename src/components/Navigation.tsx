import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface NavigationProps {
  step: number;
  data: FeedbackData;
  onNext: () => void;
  onPrev: () => void;
}

export const Navigation = ({ step, data, onNext, onPrev }: NavigationProps) => {
  const validateInput = (text: string) => {
    const length = text.trim().length;
    return length >= 2 && length <= 200;
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return data.ageGroup && data.gender;
      case 2:
        return data.rating > 0;
      case 3:
        return validateInput(data.previousSymptoms);
      case 4:
        return validateInput(data.bodyChanges);
      case 5:
        return validateInput(data.appreciatedAspects);
      case 6:
        return validateInput(data.treatmentUnderstanding);
      case 7:
        return true; // 自由回答なので常にtrue
      default:
        return false;
    }
  };

  const showBackButton = step > 1 && step < 8;

  return (
    <div className={`flex ${showBackButton ? 'justify-between' : 'justify-end'} mt-8`}>
      {showBackButton && (
        <button
          onClick={onPrev}
          className="clay-button flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          前へ
        </button>
      )}
      {step < 8 && (
        <button
          onClick={onNext}
          disabled={!canProceed()}
          className={`clay-button clay-button-primary flex items-center gap-2 ${
            !canProceed() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {step === 7 ? (
            <>
              レビューを生成
              <Sparkles size={20} />
            </>
          ) : (
            <>
              次へ
              <ChevronRight size={20} />
            </>
          )}
        </button>
      )}
    </div>
  );
};