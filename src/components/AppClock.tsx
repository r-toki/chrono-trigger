import React, { useMemo, useState } from "react";
import useInterval from "react-use/lib/useInterval";
import Clock from "react-clock";
import { chrono } from "../utils/chrono";
import { useSettings } from "../context/settings";
import { startOfToday, addHours, format } from "date-fns";
import "react-clock/dist/Clock.css";
import { Box, Stack } from "@chakra-ui/react";

export function AppClock() {
  const { settings } = useSettings();

  const startDate = useMemo(
    () => addHours(startOfToday(), Number(settings.startAtHour)),
    [settings.startAtHour]
  );
  const endDate = useMemo(
    () => addHours(startOfToday(), Number(settings.endAtHour)),
    [settings.endAtHour]
  );
  const hoursToGenerate = useMemo(
    () => Number(settings.hoursToGenerate),
    [settings.hoursToGenerate]
  );

  const [value, setValue] = useState<Date>();

  useInterval(() => {
    const chronoDate = chrono(new Date(), {
      startDate,
      endDate,
      hoursToGenerate,
    });
    setValue(chronoDate);
  }, 1_000);

  return (
    <>
      {value ? (
        <Stack alignItems="center" spacing="8">
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
          <Box fontWeight="bold" fontSize="4xl">
            {format(value, "HH:mm")}
          </Box>
        </Stack>
      ) : null}
    </>
  );
}
