import {SkedEvent} from '../../model/sked-event';

export interface FlexSkedTemplateDto {
  _id: string;
  displayName: string;
  startTime?: string;
  endTime?: string;
  status: string;
  lastUpdated?: string;
  skeds: SkedEvent[];
  live: boolean;
  statusUpdate: boolean;
}
