export interface AdjectiveDto {
  _id?: string;
  active?: boolean;
  lexicon: string;
  name: string;
  numeric: boolean;
  options: string[];
  resetValue: string | number;
  type: string;
  unitOfMeasure: string[];
  updateable: boolean | null;
  validation: string;
  value: string | number;
}
