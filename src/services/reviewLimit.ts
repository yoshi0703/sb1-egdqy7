import { REVIEW_LIMITS } from '../config/constants';

interface ReviewLimit {
  count: number;
  lastReset: string;
}

export function canGenerateReview(): boolean {
  const limit = getReviewLimit();
  const today = new Date().toDateString();

  if (!limit || limit.lastReset !== today) {
    resetLimit();
    return true;
  }

  return limit.count < REVIEW_LIMITS.DAILY_LIMIT;
}

export function incrementReviewCount(): void {
  const limit = getReviewLimit();
  const today = new Date().toDateString();

  if (!limit || limit.lastReset !== today) {
    setLimit({ count: 1, lastReset: today });
  } else {
    setLimit({
      count: limit.count + 1,
      lastReset: today
    });
  }
}

export function getRemainingAttempts(): number {
  const limit = getReviewLimit();
  const today = new Date().toDateString();

  if (!limit || limit.lastReset !== today) {
    resetLimit();
    return REVIEW_LIMITS.DAILY_LIMIT;
  }

  return Math.max(0, REVIEW_LIMITS.DAILY_LIMIT - limit.count);
}

function getReviewLimit(): ReviewLimit | null {
  try {
    const stored = localStorage.getItem(REVIEW_LIMITS.STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function setLimit(limit: ReviewLimit): void {
  localStorage.setItem(REVIEW_LIMITS.STORAGE_KEY, JSON.stringify(limit));
}

function resetLimit(): void {
  setLimit({
    count: 0,
    lastReset: new Date().toDateString()
  });
}