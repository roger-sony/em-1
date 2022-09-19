import {FlexSkedTemplateDto} from '../../api/dto/flex-sked-template.dto';
import {FlexSkedTemplate} from '../../model/flex-sked-template';

export function convertFlexSkedTemplateDtoToModel(dto: FlexSkedTemplateDto): FlexSkedTemplate {
  return {
    id: dto._id,
    displayName: dto.displayName,
    status: dto.status,
    lastUpdated: new Date(dto.lastUpdated),
    skeds: dto.skeds,
    live: dto.live,
  };
}
