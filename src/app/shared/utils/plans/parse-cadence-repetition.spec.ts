import {CadenceRepetition} from '../../../dialog/plan/shared/cadence-form/cadence-repetition';
import {parseCadenceRepetition} from './parse-cadence-repetition';

describe('parseCadenceRepetition', () => {
  it('no repetition', () => {
    expect(parseCadenceRepetition('2020-03-02T10:08:00.000Z')).toBe(CadenceRepetition.DoNotRepeat);
  });

  it('every minute', () => {
    expect(parseCadenceRepetition('* * * * *')).toBe(CadenceRepetition.EveryMinute);
  });

  it('hourly', () => {
    expect(parseCadenceRepetition('5 * * * *')).toBe(CadenceRepetition.Hourly);
  });

  it('hourly twice', () => {
    expect(parseCadenceRepetition('5,10 * * * *')).toBe(CadenceRepetition.Hourly);
  });

  it('daily', () => {
    expect(parseCadenceRepetition('5 0 * * *')).toBe(CadenceRepetition.Daily);
  });

  it('daily twice', () => {
    expect(parseCadenceRepetition('5 0,12 * * *')).toBe(CadenceRepetition.Daily);
  });

  it('weekly', () => {
    expect(parseCadenceRepetition('30 8 * * 1')).toBe(CadenceRepetition.Weekly);
  });

  it('weekly twice', () => {
    expect(parseCadenceRepetition('30 8 * * 1,4')).toBe(CadenceRepetition.Weekly);
  });

  it('monthly', () => {
    expect(parseCadenceRepetition('30 12 2 * *')).toBe(CadenceRepetition.Monthly);
  });

  it('monthly twice', () => {
    expect(parseCadenceRepetition('30 12 2,5 * *')).toBe(CadenceRepetition.Monthly);
  });

  it('yearly', () => {
    expect(parseCadenceRepetition('30 16 10 2 *')).toBe(CadenceRepetition.Yearly);
  });

  it('yearly twice', () => {
    expect(parseCadenceRepetition('30 16 10 2,3 *')).toBe(CadenceRepetition.Yearly);
  });
});
