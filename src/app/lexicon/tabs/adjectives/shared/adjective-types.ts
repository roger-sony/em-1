const iconSrc = '/adjectives/';

export const ADJECTIVE_TYPES: string[] = ['number', 'selection', 'multiselection', 'date', 'text', 'checkbox'];

export const ADJECTIVE_ICON_MAP: Record<string, string> = {
  number: `${iconSrc}number`,
  selection: `${iconSrc}selection`,
  multiselection: `${iconSrc}multiselection`,
  date: `${iconSrc}date`,
  text: `${iconSrc}text`,
  checkbox: `${iconSrc}checkbox`,
};

export const NUMBER_TYPE_OPTIONS: string[] = ['non negative numbers', 'all numbers'];

export const DATE_TYPE_OPTIONS: string[] = ['any date', 'only future dates'];
