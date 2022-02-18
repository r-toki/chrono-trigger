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

  const realTimeFromStartToEnd = endTime - startTime;
  const chronoTimeFromStartToEnd = realTimeFromStartToEnd - generateTime;
  const ratio = realTimeFromStartToEnd / chronoTimeFromStartToEnd;
  const realTimeFromStart = currentTime - startTime;
  const chronoTimeFromStart = realTimeFromStart * ratio;

  if (chronoTimeFromStart <= realTimeFromStartToEnd) {
    return new Date(startTime + chronoTimeFromStart);
  } else {
    const realTimeFromEndToEndOfToday = endOfToday().getTime() - currentTime - generateTime;
    const chronoTimeFromEndToEndOfToday = endOfToday().getTime() - endTime;
    const ratio = chronoTimeFromEndToEndOfToday / realTimeFromEndToEndOfToday;
    const chronoTimeFromEnd = realTimeFromEndToEndOfToday * ratio;
    return new Date(endTime + chronoTimeFromEnd);
  }
};
