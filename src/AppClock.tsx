import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

export function AppClock() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Clock
        hourHandWidth={10}
        hourHandLength={60}
        hourMarksWidth={9}
        hourMarksLength={15}
        minuteHandWidth={6}
        minuteHandLength={90}
        minuteMarksWidth={3}
        secondHandLength={80}
        secondHandWidth={4}
        size={300}
        value={value}
      />
    </div>
  );
}
