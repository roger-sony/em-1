import {RangeConfig, UnitOfMeasure} from '../../model/unit-of-measure';
import {RangeConfigDto, UnitOfMeasureDto} from '../dto/unit-of-measure.dto';

export function convertUnitOfMeasureDtoToModel(dto: UnitOfMeasureDto): UnitOfMeasure {
  return {
    id: dto._id,
    dateCreated: dto._dateCreated,
    displayName: dto.display_name,
    nounSubcategory: dto.noun_subcategory,
    rangeConfig: (dto.range_config || []).map(config => convertUnitOfMeasureRangeConfigDtoToModel(config)),
    type: dto.type,
    version: dto._version,
  };
}

function convertUnitOfMeasureRangeConfigDtoToModel(rangeConfigDto: RangeConfigDto): RangeConfig {
  return (
    rangeConfigDto && {
      value: rangeConfigDto.value,
      displayValue: rangeConfigDto.display_value,
    }
  );
}
