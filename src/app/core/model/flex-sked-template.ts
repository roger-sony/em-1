import {SkedEvent} from './sked-event';

export interface FlexSkedTemplate {
  id?: string;
  displayName: string;
  live?: boolean;
  status: string;
  lastUpdated?: Date;
  skeds: SkedEvent[];
  statusUpdate?: boolean;
}
