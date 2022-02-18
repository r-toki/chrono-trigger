import { endOfToday } from "date-fns";

const MS_PER_HOUR = 3_600 * 1_000;

type ChronoConfig = {
  startDate: Date;
  endDate: Date;
  hoursToGenerate: number;
};

export const chrono = (
  currentDate: Date,
  { startDate, endDate, hoursToGenerate }: ChronoConfig
) => {
  const currentTime = currentDate.getTime();
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  const generateTime = hoursToGenerate * MS_PER_HOUR;

  if (currentTime <= startTime) return new Date();

  const realFullTimeByEnd = endTime - startTime;
  const chronoFullTime = realFullTimeByEnd - generateTime;
  const ratio = realFullTimeByEnd / chronoFullTime;
  const realTimeFromStart = currentTime - startTime;
  const chronoTimeFromStart = realTimeFromStart * ratio;

  if (chronoTimeFromStart <= realFullTimeByEnd) {
    return new Date(startTime + chronoTimeFromStart);
  } else {
    const realFullTimeByTodayEnd = endOfToday().getTime() - endTime - generateTime;
    const chronoFullTimeByTodayEnd = endOfToday().getTime() - endTime;
    const ratio = realFullTimeByTodayEnd / chronoFullTimeByTodayEnd;
    const chronoTimeFromEnd = (currentTime - endTime) * ratio;
    return new Date(endTime + chronoTimeFromEnd);
  }
};
