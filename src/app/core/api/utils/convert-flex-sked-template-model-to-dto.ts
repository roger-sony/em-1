import {FlexSkedTemplate} from '../../model/flex-sked-template';
import {FlexSkedTemplateDto} from '../dto/flex-sked-template.dto';

export function convertFlexSkedTemplateModelToDto(model: Partial<FlexSkedTemplate>): FlexSkedTemplateDto {
  return {
    _id: model.id,
    displayName: model.displayName,
    status: model.status,
    lastUpdated: model.lastUpdated.toString(),
    skeds: model.skeds,
    live: model.live,
    statusUpdate: model.statusUpdate || null,
  };
}
