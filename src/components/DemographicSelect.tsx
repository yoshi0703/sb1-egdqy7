import { User, UserRound, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { GenderLayout } from './GenderLayout';

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; }[];
}

const Select = ({ label, value, onChange, options }: SelectProps) => (
  <div className="space-y-2">
    <label className="block text-lg font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="clay-select"
    >
      <option value="">選択してください</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

interface DemographicSelectProps {
  ageGroup: string;
  gender: string;
  onAgeGroupChange: (value: string) => void;
  onGenderChange: (value: string) => void;
}

export const DemographicSelect = ({
  ageGroup,
  gender,
  onAgeGroupChange,
  onGenderChange,
}: DemographicSelectProps) => {
  const ageGroups = [
    { value: "under18", label: "18歳未満" },
    { value: "18-24", label: "18-24歳" },
    { value: "25-34", label: "25-34歳" },
    { value: "35-44", label: "35-44歳" },
    { value: "45-54", label: "45-54歳" },
    { value: "55-64", label: "55-64歳" },
    { value: "65plus", label: "65歳以上" },
  ];

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-lg font-medium text-gray-700">性別</label>
          <GenderLayout 
            selectedGender={gender} 
            onSelect={(value) => onGenderChange(value)} 
          />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Select
            label="年齢層をお選びください"
            value={ageGroup}
            onChange={onAgeGroupChange}
            options={ageGroups}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};