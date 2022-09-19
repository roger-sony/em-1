export function createTimePickerOptions(): string[] {
  const halfDayTimes = new Array(12)
    .fill(0)
    .map((item, index) => (index === 0 ? 12 : index))
    .reduce((times, hour) => {
      times.push(
        ...[0, 15, 30, 45].map(minute => `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`)
      );
      return times;
    }, []);

  return halfDayTimes.map(time => `${time} AM`).concat(halfDayTimes.map(time => `${time} PM`));
}
