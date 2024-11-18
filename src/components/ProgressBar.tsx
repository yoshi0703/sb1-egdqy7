import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const adjustedStep = currentStep > 1 ? currentStep - 1 : 1;
  const questionNumber = Math.min(adjustedStep, 6);
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-start mb-2">
        <span className="text-sm font-medium text-gray-600 bg-white/50 px-3 py-1 rounded-full">
          質問 {questionNumber}/6
        </span>
      </div>
      <div className="h-2 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="clay-progress"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};