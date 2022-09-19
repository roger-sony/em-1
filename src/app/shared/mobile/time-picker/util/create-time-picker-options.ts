import {ListPickerItem} from '../../list-picker/list-picker-item';

export function createTimePickerOptions(type: 'hour' | 'minute'): ListPickerItem<string>[] {
  return new Array(12)
    .fill(0)
    .map((item, index) => String(type === 'hour' ? index + 1 : index * 5).padStart(2, '0'))
    .map(value => ({value, displayValue: value + (type === 'hour' ? ' h' : ' m')}));
}
