export type FieldValuesDto = Record<string, string[]>;

// export interface FieldValuesDto {
//   maker: string[];
//   model: string[];
//   unit_of_measure: string[];
//   source: string[];
//   master_item: string[];
//   category: string[];
//   subcategory: string[];
//   location: string[];
//   color: string[];
//   sku: string[];
//   _trigger?: string[];
// }

export interface SubcategoryFieldValuesDto {
  active: FieldValuesDto;
  inactive: FieldValuesDto;
}
