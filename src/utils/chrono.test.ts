import { isFuture, isPast, isSameDay, isSameHour, isSameMinute, subHours } from "date-fns";
import { describe, expect, it } from "vitest";
import { chrono } from "./chrono";

describe("start: 09:00, end: 18:00, generate: 1:00", () => {
  const day = "2000-01-01 ";
  const startDate = new Date(day + "09:00");
  const endDate = new Date(day + "18:00");
  const hoursToGenerate = 1;

  it("current: 8:00", () => {
    const currentDate = new Date(day + "08:00");

    const chronoDate = chrono(currentDate, { startDate, endDate, hoursToGenerate });

    expect(isSameHour(currentDate, chronoDate)).toBe(true);
    expect(isSameMinute(currentDate, chronoDate)).toBe(true);
  });

  it("current: 12:00", () => {
    const currentDate = new Date(day + "12:00");

    const chronoDate = chrono(currentDate, { startDate, endDate, hoursToGenerate });

    expect(chronoDate.getTime() - currentDate.getTime()).toBeGreaterThan(0);
  });

  it("current: 17:00", () => {
    const currentDate = new Date(day + "17:00");

    const chronoDate = chrono(currentDate, { startDate, endDate, hoursToGenerate });

    expect(subHours(chronoDate, 1).getTime()).toBe(currentDate.getTime());
  });

  it("current: 17:30", () => {
    const currentDate = new Date(day + "12:00");

    const chronoDate = chrono(currentDate, { startDate, endDate, hoursToGenerate });

    expect(chronoDate.getTime() - currentDate.getTime()).toBeGreaterThan(0);
  });
});
