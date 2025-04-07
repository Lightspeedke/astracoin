
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  // Use a consistent target date from localStorage
  useEffect(() => {
    // Check if we have a saved target date in localStorage
    const savedTargetDate = localStorage.getItem("whitelist_end_date");
    
    // If no saved date exists, save the current target date
    if (!savedTargetDate) {
      localStorage.setItem("whitelist_end_date", targetDate.toISOString());
    }
    
    // Set up the interval to update the countdown
    const interval = setInterval(() => {
      // Get the saved target date or use the prop
      const endDate = savedTargetDate 
        ? new Date(savedTargetDate)
        : targetDate;
        
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl mb-4 font-medium text-astracoin-accent">Whitelist Closes In:</h3>
      <div className="grid grid-flow-col gap-4 text-center auto-cols-max">
        <div className="flex flex-col glass-card p-4 rounded-lg">
          <span className="font-mono font-bold text-3xl md:text-4xl text-white">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="text-xs md:text-sm text-astracoin-text-gray">days</span>
        </div>
        <div className="flex flex-col glass-card p-4 rounded-lg">
          <span className="font-mono font-bold text-3xl md:text-4xl text-white">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-xs md:text-sm text-astracoin-text-gray">hours</span>
        </div>
        <div className="flex flex-col glass-card p-4 rounded-lg">
          <span className="font-mono font-bold text-3xl md:text-4xl text-white">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-xs md:text-sm text-astracoin-text-gray">min</span>
        </div>
        <div className="flex flex-col glass-card p-4 rounded-lg">
          <span className="font-mono font-bold text-3xl md:text-4xl text-white">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="text-xs md:text-sm text-astracoin-text-gray">sec</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
