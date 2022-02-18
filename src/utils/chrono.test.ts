import { isSameDay } from "date-fns";
import { expect, it } from "vitest";
import { chrono } from "./chrono";

it("check timezone", () => {
  const date1 = new Date("2000-01-01 00:00");
  const date2 = new Date("2000-01-01 12:00");
  expect(isSameDay(date1, date2)).toBe(true);
});
