import {QuantityDto} from './quantity.dto';

export interface RuleResultDto {
  _id: RuleResultIdDto;
  qty: QuantityDto;
  last_updated: string;
  unit_of_measure: string[];
}

export interface RuleResultIdDto {
  subcategory: string;
}
