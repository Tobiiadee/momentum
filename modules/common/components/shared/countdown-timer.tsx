"use client";

import React, { useState, useEffect } from "react";
import { Text } from "../../ui/text";

interface CountdownTimerProps {
  initialTime: number; // time in seconds
  onComplete?: () => void;
  onUpdate?: (timeLeft: number) => void;
  isTimerRunning?: (value: boolean) => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialTime,
  isTimerRunning,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0 && isTimerRunning) {
      isTimerRunning(true);
    }
  }, [timeLeft, isTimerRunning]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <Text variant={"p"} className='font-normal text-xs'>
        {formatTime(timeLeft)}
      </Text>
    </div>
  );
};

export default CountdownTimer;
