import React, { useContext, useEffect, useState } from 'react';
import "./stopwatch.styles.scss"
import { CurrentUserContext } from '../context/currentusercontext.component';
function StopWatch({quizTime}) {
  const storedEndTime = sessionStorage.getItem('endTime');
  const [endTime, setEndTime] = useState(storedEndTime ? new Date(storedEndTime) : null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const { setQuizTime } = useContext(CurrentUserContext)
  useEffect(() => {
    
      const interval = setInterval(() => {
        const now = new Date();
        const remaining = endTime - now;
        if (remaining <= 0) {
          setQuizTime(0)
          localStorage.removeItem('endTime');
          clearInterval(interval);
          console.log('Countdown timer has ended.');
        } else {
          setTimeRemaining(remaining);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    
      
  }, [endTime]);

  // if (!timeRemaining) {
  //   return null; // or render a loading state
  // }

  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <span className="stopwatch-container">
      Time remaining: <span className="time">{minutes}:{seconds}</span>
    </span>
  );
}

export default StopWatch;
