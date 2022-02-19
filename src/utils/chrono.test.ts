import { millisecondsToMinutes } from "date-fns";
import { describe, expect, it } from "vitest";
import { chrono } from "./chrono";

const subMinutes = (a: Date, b: Date) => millisecondsToMinutes(a.getTime() - b.getTime());

describe("start: 09:00, end: 18:00, generate: 1:00", () => {
  const day = "2000-01-01 ";
  const startDate = new Date(day + "09:00");
  const endDate = new Date(day + "18:00");
  const hoursToGenerate = 1;

  it("current: 00:00 ならば、chrono: 00:00", () => {
    const currentDate = new Date(day + "00:00");

    const chronoDate = chrono(currentDate, { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, currentDate)).toBe(0);
  });

  it("current: 08:00 ならば、chrono: 08:00", () => {
    const currentDate = new Date(day + "08:00");

    const chronoDate = chrono(currentDate, { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, currentDate)).toBe(0);
  });

  it("current: 12:00 ならば、chrono: 12:00 ~ 13:00", () => {
    const currentDate = new Date(day + "12:00");

    const chronoDate = chrono(currentDate, { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, currentDate)).toBeGreaterThan(0);
    expect(subMinutes(chronoDate, currentDate)).toBeLessThan(60);
  });

  it("current: 17:00 ならば、chrono: 18:00", () => {
    const currentDate = new Date(day + "17:00");

    const chronoDate = chrono(currentDate, { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, currentDate)).toBe(60);
  });

  it("current: 17:30 ならば、chrono: 18:00 ~ 19:00", () => {
    const currentDate = new Date(day + "17:30");

    const chronoDate = chrono(currentDate, { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, currentDate)).toBeGreaterThan(0);
    expect(subMinutes(chronoDate, currentDate)).toBeLessThan(60);
  });

  it("current: 24:00 ならば、chrono: 24:00", () => {
    const currentDate = new Date(day + "24:00");

    const chronoDate = chrono(currentDate, { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, currentDate)).toBe(0);
  });
});
