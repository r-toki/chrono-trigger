import { differenceInHours, endOfToday, isSameDay, startOfToday, sub } from "date-fns";

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
  if (!isSameDay(currentDate, startDate) || !isSameDay(currentDate, endDate)) throw new Error("");
  if (hoursToGenerate - differenceInHours(endDate, startDate) > 0) throw new Error("");

  const currentTime = currentDate.getTime();
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  const generateTime = hoursToGenerate * MS_PER_HOUR;

  if (currentTime <= startTime) return new Date();

  const realFullTimeByEnd = endTime - startTime;
  const chronoFullTimeByEnd = realFullTimeByEnd - generateTime;
  const ratio = realFullTimeByEnd / chronoFullTimeByEnd;
  const realTimeFromStart = currentTime - startTime;
  const chronoTimeFromStart = realTimeFromStart * ratio;

  if (chronoTimeFromStart <= realFullTimeByEnd) {
    return new Date(startTime + chronoTimeFromStart);
  } else {
    const realFullTimeByTodayEnd = endOfToday().getTime() - endTime - generateTime;
    if (realFullTimeByTodayEnd < 0) {
      return startOfToday();
    }
    const chronoFullTimeByTodayEnd = endOfToday().getTime() - endTime;
    const ratio = realFullTimeByTodayEnd / chronoFullTimeByTodayEnd;
    const chronoTimeFromEnd = (currentTime - (endTime - generateTime)) * ratio;
    return new Date(endTime + chronoTimeFromEnd);
  }
};
