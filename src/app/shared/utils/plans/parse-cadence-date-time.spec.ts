import * as moment from 'moment';
import {parseCadenceDateTime} from './parse-cadence-date-time';

describe('parseCadenceDateTime', () => {
  it('no repetition', () => {
    expect(parseCadenceDateTime('2020-03-02T10:08:00.000Z').toISOString()).toBe('2020-03-02T10:08:00.000Z');
  });

  it('every minute', () => {
    expect(parseCadenceDateTime('* * * * *').toISOString()).toBe(moment().set({millisecond: 0}).toISOString());
  });

  it('hourly', () => {
    expect(parseCadenceDateTime('5 * * * *').toISOString()).toBe(
      moment().set({minutes: 5, milliseconds: 0}).toISOString()
    );
  });

  it('hourly twice', () => {
    expect(parseCadenceDateTime('15,45 * * * *').toISOString()).toBe(
      moment().set({minutes: 15, milliseconds: 0}).toISOString()
    );
  });

  it('daily', () => {
    expect(parseCadenceDateTime('5 0 * * *').toISOString()).toBe(
      moment().set({hours: 0, minutes: 5, milliseconds: 0}).toISOString()
    );
  });

  it('daily twice', () => {
    expect(parseCadenceDateTime('15 8,20 * * *').toISOString()).toBe(
      moment().set({hours: 8, minutes: 15, milliseconds: 0}).toISOString()
    );
  });

  it('daily without minutes', () => {
    expect(parseCadenceDateTime('* 6 * * *').toISOString()).toBe(
      moment().set({hours: 6, minutes: 0, milliseconds: 0}).toISOString()
    );
  });

  it('weekly', () => {
    expect(parseCadenceDateTime('30 8 * * 1').toISOString()).toBe(
      moment().set({day: 1, hours: 8, minutes: 30, milliseconds: 0}).toISOString()
    );
  });

  it('weekly twice', () => {
    expect(parseCadenceDateTime('30 8 * * 2,4').toISOString()).toBe(
      moment().set({day: 2, hours: 8, minutes: 30, milliseconds: 0}).toISOString()
    );
  });

  it('weekly without time', () => {
    expect(parseCadenceDateTime('* * * * 6').toISOString()).toBe(
      moment().set({day: 6, hours: 0, minutes: 0, milliseconds: 0}).toISOString()
    );
  });

  it('monthly', () => {
    expect(parseCadenceDateTime('30 12 2 * *').toISOString()).toBe(
      moment().set({date: 2, hours: 12, minutes: 30, milliseconds: 0}).toISOString()
    );
  });

  it('monthly twice', () => {
    expect(parseCadenceDateTime('30 12 5,15 * *').toISOString()).toBe(
      moment().set({date: 5, hours: 12, minutes: 30, milliseconds: 0}).toISOString()
    );
  });

  it('yearly', () => {
    expect(parseCadenceDateTime('30 16 10 2 *').toISOString()).toBe(
      moment().set({month: 2, date: 10, hours: 16, minutes: 30, milliseconds: 0}).toISOString()
    );
  });

  it('yearly twice', () => {
    expect(parseCadenceDateTime('30 16 10 6,7 *').toISOString()).toBe(
      moment().set({month: 6, date: 10, hours: 16, minutes: 30, milliseconds: 0}).toISOString()
    );
  });
});
