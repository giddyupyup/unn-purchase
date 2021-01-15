import { useEffect, useState } from 'react';
import { calculateTimeLeft } from '../services/Utils';

export const useTimeLeft = (date) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(date));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(date));
    }, 1000);

    return () => clearTimeout(timer);
  }, [date, timeLeft]);

  return timeLeft;
};
