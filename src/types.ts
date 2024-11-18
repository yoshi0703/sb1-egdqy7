export interface FeedbackData {
  ageGroup: string;
  gender: string;
  rating: number;
  bodyChanges: string;
  appreciatedAspects: string;
  recommendation: string;
  previousSymptoms: string;
  treatmentUnderstanding: string;
  otherFeedback: string;
  generatedReview?: string;
}

export interface StepProps {
  data: FeedbackData;
  updateData: (updates: Partial<FeedbackData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}