import { motion } from 'framer-motion';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({ size = 'md', className = '' }: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.div
      className={`rounded-full overflow-hidden flex-shrink-0 ${sizeClasses[size]} ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src="/images/doctor-avatar.png"
        alt="Doctor Avatar"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};