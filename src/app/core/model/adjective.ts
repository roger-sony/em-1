export interface Adjective {
  active?: boolean;
  id?: string;
  lexicon?: string;
  min?: number;
  max?: number;
  name: string;
  numeric?: boolean;
  options?: string[];
  resetValue?: string | number;
  type: string;
  validation: string;
  value?: number | string;
  updateable?: boolean;
  unitOfMeasure?: string[] | string;
}
