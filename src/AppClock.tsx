import React, { useEffect, useState } from "react";
import { useInterval } from "react-use";
import Clock from "react-clock";
import { chrono } from "./chrono";
import "react-clock/dist/Clock.css";

export function AppClock() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const chronoTime = chrono(new Date(2022, 2 - 1, 18, 18, 1), {
      startDate: new Date(2022, 2 - 1, 18, 9, 0),
      endDate: new Date(2022, 2 - 1, 18, 18, 0),
      hoursToGenerate: 1,
    });
    console.log(chronoTime);
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
