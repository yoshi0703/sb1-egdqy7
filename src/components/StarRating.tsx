import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {
  const starVariants = {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
    selected: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.3,
      },
    },
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const ratingTexts = {
    0: { text: "評価をお選びください", color: "text-gray-400" },
    1: { text: "改善の余地があります", color: "text-yellow-500" },
    2: { text: "まあまあです", color: "text-yellow-500" },
    3: { text: "普通です", color: "text-yellow-500" },
    4: { text: "良かったです", color: "text-yellow-500" },
    5: { text: "とても素晴らしかったです！", color: "text-yellow-500" },
  };

  const handleStarClick = (value: number) => {
    if (value === rating) {
      onRatingChange(0);
    } else {
      onRatingChange(value);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="relative flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            onClick={() => handleStarClick(star)}
            className="relative w-12 h-12 sm:w-16 sm:h-16 focus:outline-none"
            variants={starVariants}
            initial="initial"
            animate={star <= rating ? "selected" : "animate"}
            whileHover="hover"
            whileTap="tap"
          >
            <Star
              className={`w-full h-full ${
                star <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              strokeWidth={1.5}
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={rating}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`text-center ${ratingTexts[rating as keyof typeof ratingTexts].color}`}
        >
          <p className="text-xl font-medium">
            {ratingTexts[rating as keyof typeof ratingTexts].text}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};