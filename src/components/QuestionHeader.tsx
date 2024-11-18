import { motion } from 'framer-motion';
import { Avatar } from './Avatar';

interface QuestionHeaderProps {
  title: string;
}

export const QuestionHeader = ({ title }: QuestionHeaderProps) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Avatar size="md" />
      <motion.h2 
        className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {title}
      </motion.h2>
    </div>
  );
};