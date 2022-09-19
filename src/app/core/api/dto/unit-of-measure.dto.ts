export interface UnitOfMeasureDto {
  _id: string;
  range_config: RangeConfigDto[];
  _version: number;
  noun_subcategory: string;
  display_name: string;
  type: string;
  _dateCreated: Date;
  __v: number;
}

export interface RangeConfigDto {
  value: number;
  display_value: string;
}
