import {FieldValues, SubcategoryFieldValues} from '../../model/field-values';
import {FieldValuesDto, SubcategoryFieldValuesDto} from '../dto/field-values.dto';

export function convertFieldValuesDtoToModel(dto: FieldValuesDto): FieldValues {
  return dto;
  // return {
  //   category: dto.category || [],
  //   color: dto.color || [],
  //   location: dto.location || [],
  //   maker: dto.maker || [],
  //   masterItem: dto.master_item || [],
  //   model: dto.model || [],
  //   sku: dto.sku || [],
  //   source: dto.source || [],
  //   subcategory: dto.subcategory || [],
  //   trigger: dto._trigger || [],
  //   unitOfMeasure: dto.unit_of_measure || [],
  // };
}

export function convertSubcategoryFieldValuesDtoToModel(dto: SubcategoryFieldValuesDto): SubcategoryFieldValues {
  return {
    active: dto.active && convertFieldValuesDtoToModel(dto.active),
    inactive: dto.inactive && convertFieldValuesDtoToModel(dto.inactive),
  };
}
