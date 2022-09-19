import {roundTimePickerMinutes} from './round-time-picker-minutes';

describe('roundTimePickerMinutes', () => {
  it('no rounding', () => {
    const date = new Date(2020, 1, 27, 12, 40);
    const roundedTime = roundTimePickerMinutes(date);
    expect(roundedTime.year()).toBe(2020);
    expect(roundedTime.month()).toBe(1);
    expect(roundedTime.date()).toBe(27);
    expect(roundedTime.hour()).toBe(12);
    expect(roundedTime.minute()).toBe(40);
  });

  it('round down to five minutes', () => {
    const date = new Date(2020, 1, 27, 12, 47);
    const roundedTime = roundTimePickerMinutes(date);
    expect(roundedTime.year()).toBe(2020);
    expect(roundedTime.month()).toBe(1);
    expect(roundedTime.date()).toBe(27);
    expect(roundedTime.hour()).toBe(12);
    expect(roundedTime.minute()).toBe(45);
  });

  it('round down to ten minutes', () => {
    const date = new Date(2020, 1, 27, 12, 42);
    const roundedTime = roundTimePickerMinutes(date);
    expect(roundedTime.year()).toBe(2020);
    expect(roundedTime.month()).toBe(1);
    expect(roundedTime.date()).toBe(27);
    expect(roundedTime.hour()).toBe(12);
    expect(roundedTime.minute()).toBe(40);
  });

  it('round up to five minutes', () => {
    const date = new Date(2020, 1, 27, 12, 53);
    const roundedTime = roundTimePickerMinutes(date);
    expect(roundedTime.year()).toBe(2020);
    expect(roundedTime.month()).toBe(1);
    expect(roundedTime.date()).toBe(27);
    expect(roundedTime.hour()).toBe(12);
    expect(roundedTime.minute()).toBe(55);
  });

  it('round up to ten minutes', () => {
    const date = new Date(2020, 1, 27, 12, 48);
    const roundedTime = roundTimePickerMinutes(date);
    expect(roundedTime.year()).toBe(2020);
    expect(roundedTime.month()).toBe(1);
    expect(roundedTime.date()).toBe(27);
    expect(roundedTime.hour()).toBe(12);
    expect(roundedTime.minute()).toBe(50);
  });

  it('round up to next hour', () => {
    const date = new Date(2020, 1, 27, 14, 58);
    const roundedTime = roundTimePickerMinutes(date);
    expect(roundedTime.year()).toBe(2020);
    expect(roundedTime.month()).toBe(1);
    expect(roundedTime.date()).toBe(27);
    expect(roundedTime.hour()).toBe(15);
    expect(roundedTime.minute()).toBe(0);
  });

  it('round up to next day', () => {
    const date = new Date(2020, 1, 27, 23, 58);
    const roundedTime = roundTimePickerMinutes(date);
    expect(roundedTime.year()).toBe(2020);
    expect(roundedTime.month()).toBe(1);
    expect(roundedTime.date()).toBe(28);
    expect(roundedTime.hour()).toBe(0);
    expect(roundedTime.minute()).toBe(0);
  });

  it('round up to next month', () => {
    const date = new Date(2020, 1, 29, 23, 58);
    const roundedTime = roundTimePickerMinutes(date);
    expect(roundedTime.year()).toBe(2020);
    expect(roundedTime.month()).toBe(2);
    expect(roundedTime.date()).toBe(1);
    expect(roundedTime.hour()).toBe(0);
    expect(roundedTime.minute()).toBe(0);
  });

  it('round up to next year', () => {
    const date = new Date(2020, 11, 31, 23, 58);
    const roundedTime = roundTimePickerMinutes(date);
    expect(roundedTime.year()).toBe(2021);
    expect(roundedTime.month()).toBe(0);
    expect(roundedTime.date()).toBe(1);
    expect(roundedTime.hour()).toBe(0);
    expect(roundedTime.minute()).toBe(0);
  });
});
