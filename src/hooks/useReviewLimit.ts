import { useState, useEffect } from 'react';

const STORAGE_KEY = 'review_generation';
const DAILY_LIMIT = 5;

interface ReviewLimitData {
  count: number;
  lastReset: string;
}

export const useReviewLimit = () => {
  const [remainingAttempts, setRemainingAttempts] = useState(DAILY_LIMIT);
  const [isLimitReached, setIsLimitReached] = useState(false);

  const getCurrentDate = () => new Date().toISOString().split('T')[0];

  const getLimitData = (): ReviewLimitData => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { count: 0, lastReset: getCurrentDate() };
  };

  const updateLimitData = (data: ReviewLimitData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setRemainingAttempts(DAILY_LIMIT - data.count);
    setIsLimitReached(data.count >= DAILY_LIMIT);
  };

  const checkAndResetDaily = () => {
    const data = getLimitData();
    const currentDate = getCurrentDate();

    if (data.lastReset !== currentDate) {
      const newData = { count: 0, lastReset: currentDate };
      updateLimitData(newData);
      return newData;
    }
    return data;
  };

  const incrementCount = () => {
    const data = checkAndResetDaily();
    if (data.count < DAILY_LIMIT) {
      const newData = {
        ...data,
        count: data.count + 1,
      };
      updateLimitData(newData);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const data = checkAndResetDaily();
    updateLimitData(data);
  }, []);

  return {
    remainingAttempts,
    isLimitReached,
    incrementCount,
  };
};