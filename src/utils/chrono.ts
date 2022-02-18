import { addDays, nextDay, startOfDay } from "date-fns";

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
  const realCurrentTime = currentDate.getTime();

  const realStartTime = startDate.getTime();
  const realEndTime = endDate.getTime() - hoursToGenerate * MS_PER_HOUR;
  const realTodayEndTime = startOfDay(addDays(currentDate, 1)).getTime();

  const chronoStartTime = startDate.getTime();
  const chronoEndTime = endDate.getTime();
  const chronoTodayEndTime = startOfDay(addDays(currentDate, 1)).getTime();

  if (realCurrentTime < realStartTime) {
    return currentDate;
  } else if (realCurrentTime < realEndTime) {
    const realTimeFromStart = realCurrentTime - realStartTime;
    const chronoTimeFromStart =
      (realTimeFromStart * (chronoEndTime - chronoStartTime)) / (realEndTime - realStartTime);
    return new Date(chronoStartTime + chronoTimeFromStart);
  } else {
    const realTimeFromEnd = realCurrentTime - realEndTime;
    const chronoTimeFromEnd =
      (realTimeFromEnd * (chronoTodayEndTime - chronoEndTime)) / (realTodayEndTime - realEndTime);
    return new Date(chronoEndTime + chronoTimeFromEnd);
  }
};
