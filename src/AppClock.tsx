import React, { useEffect, useMemo, useState } from "react";
import useInterval from "react-use/lib/useInterval";
import Clock from "react-clock";
import { chrono } from "./utils/chrono";
import { useSettings } from "./context/settings";
import { startOfToday, addHours } from "date-fns";
import "react-clock/dist/Clock.css";

export function AppClock() {
  const { settings } = useSettings();

  const startDate = useMemo(() => addHours(startOfToday(), Number(settings.startAtHour)), []);
  const endDate = useMemo(() => addHours(startOfToday(), Number(settings.endAtHour)), []);

  const [value, setValue] = useState<Date>();

  useInterval(() => {
    const chronoDate = chrono(new Date(), {
      startDate,
      endDate,
      hoursToGenerate: Number(settings.hoursToGenerate),
    });
    setValue(chronoDate);
  }, 1_000);

  return (
    <>
      {value ? (
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
      ) : null}
    </>
  );
}
