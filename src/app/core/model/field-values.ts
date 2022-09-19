export type FieldValues = Record<string, string[]>;

// export interface FieldValues {
//   maker: string[];
//   model: string[];
//   unitOfMeasure: string[];
//   source: string[];
//   masterItem: string[];
//   category: string[];
//   subcategory: string[];
//   location: string[];
//   color: string[];
//   sku: string[];
//   trigger?: string[];
// }

export interface SubcategoryFieldValues {
  active: FieldValues;
  inactive: FieldValues;
}
