import { isSameDay } from "date-fns";
import { expect, it } from "vitest";
import { chrono } from "./chrono";

it("", () => {
  const date1 = new Date(2000, 0, 1, 0, 0);
  const date2 = new Date(2000, 0, 1, 12, 0);
  console.log(date1);
  console.log(date2);
  expect(isSameDay(date1, date2)).toBe(true);
});
