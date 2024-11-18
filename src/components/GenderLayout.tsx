import { User, UserRound, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface GenderLayoutProps {
  selectedGender: string;
  onSelect: (gender: 'male' | 'female' | 'prefer-not-to-say') => void;
}

export const GenderLayout = ({ selectedGender, onSelect }: GenderLayoutProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-3 gap-4">
        <motion.button
          onClick={() => onSelect('male')}
          className={`p-6 rounded-2xl transition-all duration-300 ${
            selectedGender === 'male'
              ? 'bg-blue-50 ring-2 ring-blue-500'
              : 'bg-white hover:bg-gray-50'
          } flex flex-col items-center gap-4 group`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className={`p-4 rounded-full ${
              selectedGender === 'male'
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 text-blue-500 group-hover:bg-blue-200'
            } transition-colors duration-300`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <User size={28} />
          </motion.div>
          <div className="space-y-1 text-center">
            <h3 className={`text-lg font-semibold ${
              selectedGender === 'male' ? 'text-blue-700' : 'text-gray-700'
            }`}>
              男性
            </h3>
          </div>
        </motion.button>

        <motion.button
          onClick={() => onSelect('female')}
          className={`p-6 rounded-2xl transition-all duration-300 ${
            selectedGender === 'female'
              ? 'bg-rose-50 ring-2 ring-rose-500'
              : 'bg-white hover:bg-gray-50'
          } flex flex-col items-center gap-4 group`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className={`p-4 rounded-full ${
              selectedGender === 'female'
                ? 'bg-rose-500 text-white'
                : 'bg-rose-100 text-rose-500 group-hover:bg-rose-200'
            } transition-colors duration-300`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <UserRound size={28} />
          </motion.div>
          <div className="space-y-1 text-center">
            <h3 className={`text-lg font-semibold ${
              selectedGender === 'female' ? 'text-rose-700' : 'text-gray-700'
            }`}>
              女性
            </h3>
          </div>
        </motion.button>

        <motion.button
          onClick={() => onSelect('prefer-not-to-say')}
          className={`p-6 rounded-2xl transition-all duration-300 ${
            selectedGender === 'prefer-not-to-say'
              ? 'bg-gray-50 ring-2 ring-gray-500'
              : 'bg-white hover:bg-gray-50'
          } flex flex-col items-center gap-4 group`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className={`p-4 rounded-full ${
              selectedGender === 'prefer-not-to-say'
                ? 'bg-gray-500 text-white'
                : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
            } transition-colors duration-300`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <HelpCircle size={28} />
          </motion.div>
          <div className="space-y-1 text-center">
            <h3 className={`text-lg font-semibold ${
              selectedGender === 'prefer-not-to-say' ? 'text-gray-700' : 'text-gray-700'
            }`}>
              回答しない
            </h3>
          </div>
        </motion.button>
      </div>
    </div>
  );
};