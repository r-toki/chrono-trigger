import { millisecondsToMinutes } from "date-fns";
import { describe, expect, it } from "vitest";
import { chrono } from "./chrono";

class MyDate {
  static of(hours_minutes: string) {
    return new Date(`2000-01-01 ${hours_minutes}`);
  }
}

const subMinutes = (a: Date, b: Date) => millisecondsToMinutes(a.getTime() - b.getTime());

describe("start: 09:00, end: 18:00, generate: 1:00", () => {
  const startDate = MyDate.of("09:00");
  const endDate = MyDate.of("18:00");
  const hoursToGenerate = 1;

  it("current: 00:00 ならば、chrono: 00:00", () => {
    const chronoDate = chrono(MyDate.of("00:00"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("00:00"))).toBe(0);
  });

  it("current: 08:00 ならば、chrono: 08:00", () => {
    const chronoDate = chrono(MyDate.of("08:00"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("08:00"))).toBe(0);
  });

  it("current: 12:00 ならば、chrono: 12:00 ~ 13:00", () => {
    const chronoDate = chrono(MyDate.of("12:00"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("12:00"))).toBeGreaterThan(0);
    expect(subMinutes(MyDate.of("13:00"), chronoDate)).toBeLessThan(60);
  });

  it("current: 17:00 ならば、chrono: 18:00", () => {
    const chronoDate = chrono(MyDate.of("17:00"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("18:00"))).toBe(0);
  });

  it("current: 17:30 ならば、chrono: 18:00 ~ 18:30", () => {
    const chronoDate = chrono(MyDate.of("17:30"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("18:00"))).toBeGreaterThan(0);
    expect(subMinutes(MyDate.of("18:30"), chronoDate)).toBeLessThan(30);
  });

  it("current: 24:00 ならば、chrono: 24:00", () => {
    const chronoDate = chrono(MyDate.of("24:00"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("24:00"))).toBe(0);
  });
});

describe("start: 15:00, end: 22:00, generate: 1:00", () => {
  const startDate = MyDate.of("15:00");
  const endDate = MyDate.of("22:00");
  const hoursToGenerate = 1;

  it("current: 00:00 ならば、chrono: 00:00", () => {
    const chronoDate = chrono(MyDate.of("00:00"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("00:00"))).toBe(0);
  });

  it("current: 15:00 ならば、chrono: 15:00", () => {
    const chronoDate = chrono(MyDate.of("15:00"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("15:00"))).toBe(0);
  });

  it("current: 21:00 ならば、chrono: 21:00 ~ 22:00", () => {
    const chronoDate = chrono(MyDate.of("21:00"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("21:00"))).toBeGreaterThan(0);
    expect(subMinutes(MyDate.of("22:00"), chronoDate)).toBeLessThan(60);
  });

  it("current: 21:00 ならば、chrono: 22:00", () => {
    const chronoDate = chrono(MyDate.of("21:00"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("22:00"))).toBe(0);
  });

  it("current: 22:30 ならば、chrono: 22:00 ~ 22:30", () => {
    const chronoDate = chrono(MyDate.of("22:30"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("22:00"))).toBeGreaterThan(0);
    expect(subMinutes(MyDate.of("22:30"), chronoDate)).toBeLessThan(30);
  });

  it("current: 24:00 ならば、chrono: 24:00", () => {
    const chronoDate = chrono(MyDate.of("24:00"), { startDate, endDate, hoursToGenerate });

    expect(subMinutes(chronoDate, MyDate.of("24:00"))).toBe(0);
  });
});
