export interface UnitOfMeasure {
  id: string;
  rangeConfig: RangeConfig[];
  version: number;
  nounSubcategory: string;
  displayName: string;
  type: string;
  dateCreated: Date;
}

export interface RangeConfig {
  value: number;
  displayValue: string;
}
